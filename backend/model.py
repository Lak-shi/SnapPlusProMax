import torch
import torch.nn as nn

# Generator model (U-Net)
class Generator(nn.Module):
    def __init__(self):
        super(Generator, self).__init__()

        def conv_block(in_channels, out_channels, kernel_size=4, stride=2, padding=1, batch_norm=True):
            layers = [nn.Conv2d(in_channels, out_channels, kernel_size, stride, padding)]
            if batch_norm:
                layers.append(nn.BatchNorm2d(out_channels))
            layers.append(nn.LeakyReLU(0.2))
            return nn.Sequential(*layers)

        def deconv_block(in_channels, out_channels, kernel_size=4, stride=2, padding=1, dropout=0.0):
            layers = [nn.ConvTranspose2d(in_channels, out_channels, kernel_size, stride, padding)]
            layers.append(nn.ReLU())
            if dropout > 0.0:
                layers.append(nn.Dropout(dropout))
            return nn.Sequential(*layers)

        self.encoder = nn.Sequential(
            conv_block(3, 64, batch_norm=False),
            conv_block(64, 128),
            conv_block(128, 256),
            conv_block(256, 512)
        )

        self.decoder = nn.Sequential(
            deconv_block(512, 256, dropout=0.5),
            deconv_block(256, 128, dropout=0.5),
            deconv_block(128, 64),
            nn.ConvTranspose2d(64, 3, 4, stride=2, padding=1),
            nn.Tanh()
        )

    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x
