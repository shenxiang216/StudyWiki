1.不同人修改了不同文件的处理？

首先用fetch命令将远端仓库的变更拉取下来

git fetch github（github为远端仓库的别名）

然后用merge的命令，让当前分支和远端的分支进行合并

git merge 本地分支名 远端分支名

然后向远端进行push

 

2.不同人修改了相同文件的不同区域？（不会产生冲突）

和1中的方式一样使用fetch和merge然后进行push

或者直接进行pull，然后进行push

因为在git中修改的是文件的不同位置，git可以智能的帮我们进行commit

3.不同人修改了相同文件的同一个位置？（产生了冲突）

当别人也对这个区域进行修改的时候，并且已经向github进行了push，但我们在进行向远端进行push的时候会报冲突，此时merge会失败，我们需要手动对相关文件进行修改（已经和另一个人进行了协商），然后执行git commit即可

我们就会就可以向github进行push了

4.一个人变更了文件名，而另一个人对文件的内容进行了修改？

git会智能的识别出文件发生了是文件名发生了变化，git会自动的处理，直接进行pull（或者fetch+merge）

然后进行push

5.多人把同一文件改成不同的文件名？

当我们merge的时候

会产生冲突，git就不管了，让你们自己处理

git会报

both deleted ：index.htm

added by us: index1.htm

added by them:index2.htm

此时需要我们自己进行操作，首先我们都是改名字，所以我们不需要index.htm

那么我们使用git rm index.htm将不要merge的文件删除

我们使用git add index1.htm将要merge的文件进行添加

将index2.htm进行删除

然后就可以进行merge了