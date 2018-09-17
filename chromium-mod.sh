# **********************************************************************
# * Project: 00-piws-vars                                    	   *
# * Created: 05/06/2018 22:27                                          *
# * Author: Martin Svensson aka ztealmax - pi-workbench.org            *
# * Info: create in /etc/chromium-browser/customizations/              *
# * Note: replaces rpi-chromium-mods                                   *
# **********************************************************************
#
PICHROMIUMMODS="/etc/chromium-browser/customizations/00-rpi-vars"

if [ -f "$PICHROMIUMMODS" ];
then
   echo "$PICHROMIUMMODS purge rpi-chromium-mods..."
      sudo apt-get remove --purge --autoremove -y rpi-chromium-mods
else
   echo "rpi-chromium mods not present all is good..." >&2
# -[10]-chromium-customizations.sh--------------------------------------
sudo -- sh -c "echo 'CHROMIUM_FLAGS=' >> /etc/chromium-browser/customizations/00-piws-vars"
sudo sed -i 's/'CHROMIUM_FLAGS='/''CHROMIUM_FLAGS="--disk-cache-size=0 --use-gl=egl --gles --disable-quic --enable-fast-unload --enable-checker-imaging --enable-tcp-fast-open --enable-native-gpu-memory-buffers --enable-gpu-rasterization --enable-zero-copy"''/g' /etc/chromium-browser/customizations/00-piws-vars

# -------------------------------------------------------------[10]-END-
echo "piws-chromium modifications is now installed..."

fi
