import cv2
import sys
import os
import numpy as np
import matplotlib.pyplot as plt
dir = os.path.dirname(__file__)
path = os.path.join(dir, 'images','temp.jpg')
path=os.path.normpath(path).replace("\\","//")
#Binarization
def getBinarize():
    img=cv2.imread(path,cv2.IMREAD_GRAYSCALE)
    threadshot=128
    x=img.shape[0]
    y=img.shape[1]
    for i in range(x):
        for j in range(y):
            if img[i][j]>threadshot:
                img[i][j]=255      
            else:
                img[i][j]=0
    return img

#Grey Scale Image
def getGreyScale():
    img=cv2.imread(path)
    threadshot=128
    x=img.shape[0]
    y=img.shape[1]
    for x in img:
        for y in x:
            red = y[0]+1
            green = y[1]+1
            blue = y[2]+1
            average = (red + green + blue) / 3
            y[0] = average
            y[1] = average
            y[2] = average
    return img
#Gausian blur effect
def blur():
    plt.style.use('seaborn')
    loaded_img = cv2.imread(path)
    loaded_img = cv2.cvtColor(loaded_img,cv2.COLOR_BGR2RGB)
    Blur_Effect_Img = cv2.GaussianBlur(loaded_img, (35, 35), 0)
    Blur_Effect_Img=cv2.cvtColor(Blur_Effect_Img,cv2.COLOR_BGR2RGB)
    return Blur_Effect_Img
#detect coins
def detect_coins():
    img=cv2.imread(path);
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(grey, (17, 17), 0)
    outline = cv2.Canny(blurred, 30, 150)
    (cnts, _) = cv2.findContours(outline, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(img, cnts, -1, (0, 255, 0), 2)
    return img
#Emboss filter
def emboss():
    plt.style.use('seaborn')
    loaded_img = cv2.imread(path)
    loaded_img = cv2.cvtColor(loaded_img,cv2.COLOR_BGR2RGB)
    Emboss_Kernel = np.array([[0,-1,-1],[1,0,-1],[1,1,0]])
    Emboss_Effect_Img = cv2.filter2D(src=loaded_img, kernel=Emboss_Kernel, ddepth=-1)
    Emboss_Effect_Img = cv2.cvtColor(Emboss_Effect_Img,cv2.COLOR_BGR2RGB)
    return Emboss_Effect_Img
#clear coins
def clear_coins():
    img=cv2.imread(path,cv2.IMREAD_GRAYSCALE)
    th,binarize=cv2.threshold(img,130,255,cv2.THRESH_BINARY)
    im_floodfill = binarize.copy()
    h, w = binarize.shape[:2]
    mask = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(im_floodfill, mask, (0,0), 255);
    im_floodfill_inv = cv2.bitwise_not(im_floodfill)
    im_out = binarize | im_floodfill_inv
    return im_out
#sharp image
def sharp():
    plt.style.use('seaborn')
    loaded_img = cv2.imread(path)
    loaded_img = cv2.cvtColor(loaded_img,cv2.COLOR_BGR2RGB)
    Sharpen_Kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
    Sharpen_Effect_Img = cv2.filter2D(src=loaded_img, kernel=Sharpen_Kernel, ddepth=-1)
    Sharpen_Effect_Img  = cv2.cvtColor(Sharpen_Effect_Img ,cv2.COLOR_BGR2RGB)
    return Sharpen_Effect_Img
#specia filter
def specia():
    plt.style.use('seaborn')
    loaded_img = cv2.imread(path)
    loaded_img = cv2.cvtColor(loaded_img,cv2.COLOR_BGR2RGB)
    Sepia_Kernel = np.array([[0.272, 0.534, 0.131],[0.349, 0.686, 0.168],[0.393, 0.769, 0.189]])
    Sepia_Effect_Img = cv2.filter2D(src=loaded_img, kernel=Sepia_Kernel, ddepth=-1)
    Sepia_Effect_Img = cv2.cvtColor(Sepia_Effect_Img,cv2.COLOR_BGR2RGB)
    return Sepia_Effect_Img
#low brightness
def low_brightness():
    loaded_img = cv2.imread(path)
    loaded_img=loaded_img-5
    return loaded_img
#High brightness
def high_brightness():
    loaded_img = cv2.imread(path)
    loaded_img=loaded_img+5
    return loaded_img
#low Contrast
def low_contrast():
    loaded_img = cv2.imread(path)
    loaded_img=loaded_img/2
    return loaded_img
#high Contrast
def high_contrast():
    loaded_img = cv2.imread(path)
    loaded_img=loaded_img*2
    return loaded_img
#inrease Gamma Correction
def increase_gamma_correction():
    img = cv2.imread(path)
    gamma=0.5
    img = cv2.normalize(img.astype('float'), None, 0.0, 1.0, cv2.NORM_MINMAX)
    gammaCorrection=img**gamma
    gammaCorrection = cv2.normalize(gammaCorrection, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)
    return gammaCorrection
#Inverse Transform
def inverse_transform():
    img=cv2.imread(path)
    img = cv2.normalize(img.astype('float'), None, 0.0, 1.0, cv2.NORM_MINMAX)
    inverse=1-img
    inverse = cv2.normalize(inverse, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)
    return inverse
#log transform
def log_transform():
    img=cv2.imread(path);
    img = cv2.normalize(img.astype('float'), None, 0.0, 1.0, cv2.NORM_MINMAX)
    logrithmTransform=2*np.log(1+img);
    logrithmTransform = cv2.normalize(logrithmTransform, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)
    return logrithmTransform
if sys.argv[1]=='1':
    temp=getBinarize()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='2':
    temp=getGreyScale()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='3':
    temp=blur()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='4':
    temp=detect_coins()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='5':
    temp=emboss()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='6':
    temp=clear_coins()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='7':
    temp=sharp()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='8':
    temp=specia()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='9':
    temp=low_brightness()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='10':
    temp=high_brightness()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='11':
    temp=low_contrast()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='12':
    temp=high_contrast()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='13':
    temp=increase_gamma_correction()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='14':
    temp=inverse_transform()
    cv2.imwrite(path,temp)
elif sys.argv[1]=='15':
    temp=log_transform()
    cv2.imwrite(path,temp)
else:
    print("Nothing found")






