Project 3
By: Xavier Touikan

ARTIST STATEMENT:

My goal is pretty straight forward, I wanted to create an online tamagotchi that the user can feed with different kind of files. With the ascii art library, I can transform pictures into ascii text and I can simulate the little creating eating the ascii image by removing the characters one at the time. Since the tamagotchis were used over a long period of time and not a one time interaction, I wanted to implement some kind of database to save the state and progress of the tamagotchi. Firebase is very easy to use and is a good way to implement database into github pages. 

There is a lot that can be added to the project since the behavior is very simple right now. For this project I wanted to create a working prototype and especially have the image and text eating working properly. For now, the datas are saved into a single database so everyone takes care of the same tamagotchi. I have yet to decide if everyone should take care of the same one or have a personal relationship with it. For now, the hunger meter fills a little bit over real time seconds, the happiness meter increments if the type of file eaten is liked or the hunger meter is at 0 and the happiness meter decrements if the type of file eaten is unliked or the hunger meter is full. The hunger meter will decrease based on the size of the file. I used different algorithms for texts and pictures so text files fills more than the equivalent of 0.01% of what a picture would fill. 

I also had the thought of creating a desktop app with this concept that would literally delete the files eaten, replacing the trash can for a sweeter alternative. If anyone has an idea on where I should start looking you can email me at xavier.touikan@gmail.com .

For concrete future ideas I am thinking of adding some activities to do such as playing music, taking a bath or going on the computer. These are heavily inspired by the real tamagotchi. I also want to point out that I used original tamagotchi sprites and converted them to ascii art. I could also work on creating my own sprites. The real tamagotchi also have an age progression that is quite interesting. It starts as a baby and grows up over time unlocking new sprites and activities to do. As a project with a database I could extend the progression to take a few weeks even a few months! I also wanted to implement some AI elements to improve the complexity of the behavior. With ml5 I could run some simple image classification so the creature could have different reactions based on the content inside the picture, the same could probably done with the text too. I could also try to find a way to convert sound files to some sort of ascii waves. 

I will gladly listen to any suggestion to improve on this project. Again, if you want to message me please email me at xavier.touikan@gmail.com





