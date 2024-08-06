# STEMDirectory
Directory listings for uOttawa STEM building.

Sign at the entrance near design commons runs on this site. 

Display is hooked up to a Zotac box running Ubuntu.

Webpage runs locally oon the machine. 

## To update the webpage on the display itself, connect a keyboard to the machine and press ALT+F4. 

In the shell add a new usb drive using following commands:

  fdisk -l 
  
  // this will show a list of all the disks connected to the system
  
  mkdir  /media/usb-drive 
  
  mount /dev/sdb* /media/usb-drive //replace * with the drive letter/number

Then copy the files from the USB to the webpage directory using:

  sudo cp -r STEMDirectory /var/www/html/ 

then run retart using:

  shutdown -r now

The webpage should be updated! 

  
