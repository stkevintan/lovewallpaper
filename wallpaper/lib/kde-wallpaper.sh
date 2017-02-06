#!/bin/sh
js=$(mktemp)
cat > $js <<_EOF
var wallpaper = "$1";
var activity = activities()[0];
activity.currentConfigGroup = new Array("Wallpaper", "image");
activity.writeConfig("wallpaper", wallpaper);
activity.writeConfig("userswallpaper", wallpaper);
activity.reloadConfig();
_EOF
qdbus org.kde.plasma-desktop /App local.PlasmaApp.loadScriptInInteractiveConsole "$js" > /dev/null
xdotool search --name "Desktop Shell Scripting Console – Plasma Desktop Shell" windowactivate key ctrl+e key ctrl+w
rm -f "$js"

#
# var allDesktops = desktops();
# print (allDesktops);

# for (i=0;i<allDesktops.length;i++) {
#     d = allDesktops[i];
#     d.wallpaperPlugin = "org.kde.image";
#     d.currentConfigGroup = Array("Wallpaper", "org.kde.image", "General");
#     d.writeConfig("Image", "file:///home/david/pictures/Wallpapers/northern_lights-wide.jpg")
# }

#qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript