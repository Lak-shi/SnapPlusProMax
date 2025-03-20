import sys
import torch
from torchvision import transforms
from PIL import Image
import os
import torch.nn as nn
import torch.nn.functional as F

# ✅ Define Generator Model (Matching pix2pix Architecture)
class UnetGenerator(nn.Module):
    """Modified U-Net generator for Pix2Pix"""
    def __init__(self, input_nc=3, output_nc=3, num_downs=8):
        super(UnetGenerator, self).__init__()
        unet_block = UnetSkipConnectionBlock(512, 512, input_nc=None, submodule=None, innermost=True)
        for _ in range(num_downs - 5):
            unet_block = UnetSkipConnectionBlock(512, 512, input_nc=None, submodule=unet_block)
        unet_block = UnetSkipConnectionBlock(256, 512, input_nc=None, submodule=unet_block)
        unet_block = UnetSkipConnectionBlock(128, 256, input_nc=None, submodule=unet_block)
        unet_block = UnetSkipConnectionBlock(64, 128, input_nc=None, submodule=unet_block)
        self.model = UnetSkipConnectionBlock(output_nc, 64, input_nc=input_nc, submodule=unet_block, outermost=True)

    def forward(self, input):
        return self.model(input)


class UnetSkipConnectionBlock(nn.Module):
    """Defines the Unet submodule"""
    def __init__(self, outer_nc, inner_nc, input_nc=None, submodule=None, outermost=False, innermost=False):
        super(UnetSkipConnectionBlock, self).__init__()
        self.outermost = outermost
        if input_nc is None:
            input_nc = outer_nc
        downconv = nn.Conv2d(input_nc, inner_nc, kernel_size=4, stride=2, padding=1, bias=False)
        downrelu = nn.LeakyReLU(0.2, True)
        uprelu = nn.ReLU(True)
        upconv = nn.ConvTranspose2d(inner_nc * 2, outer_nc, kernel_size=4, stride=2, padding=1, bias=False)

        if outermost:
            down = [downconv]
            up = [uprelu, upconv, nn.Tanh()]
            model = down + [submodule] + up
        elif innermost:
            upconv = nn.ConvTranspose2d(inner_nc, outer_nc, kernel_size=4, stride=2, padding=1, bias=False)
            model = [downrelu, downconv, uprelu, upconv]
        else:
            model = [downrelu, downconv, submodule, uprelu, upconv, nn.BatchNorm2d(outer_nc)]

        self.model = nn.Sequential(*model)

    def forward(self, x):
        if self.outermost:
            return self.model(x)
        else:
            return torch.cat([x, self.model(x)], 1)


# ✅ Constants
MODEL_PATH = "model_weights.pth"
OUTPUT_DIR = "uploads"

# ✅ Function to load model
def load_model():
    try:
        model = UnetGenerator()  # Use UnetGenerator instead of a generic model
        state_dict = torch.load(MODEL_PATH, map_location="cpu")
        model.load_state_dict(state_dict)
        model.eval()
        return model
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        sys.exit(1)

# ✅ Function to process the sketch
def process_image(image_path):
    try:
        model = load_model()

        # Load and transform image
        image = Image.open(image_path).convert("RGB")
        transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
        ])
        input_tensor = transform(image).unsqueeze(0)

        # Process image with model
        with torch.no_grad():
            output_tensor = model(input_tensor)

        # Convert output tensor to image
        output_image = transforms.ToPILImage()(output_tensor.squeeze(0))

        # Save processed image
        output_filename = f"processed_{os.path.basename(image_path)}"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        output_image.save(output_path)

        print(output_path)  # Output file path for API response

    except Exception as e:
        print(f"❌ Error processing image: {e}")
        sys.exit(1)

# ✅ Main execution
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ No image path provided.")
        sys.exit(1)

    image_path = sys.argv[1]
    process_image(image_path)
