-------------------------------------------------------------------
update at : 20200826 ( ref 20200627 )

## Stage: Deploy

### `docker`
sudo docker run -p 7000:80 -p 7001:22 -p 7002:3000 -p 7003:3001 -p 7004:3900 -p 7005:8080 -p 7006:30301 -p 7007:30302 -p 7008:30303 -p 7009:30304 -v /home/cni/docker/sharedVol:/sharedVol -e RESOLUTION=1920x1080 --name aecomwebsite_platform source_ubu18_vnc80_nodejs_ssh_paibd:20200324 <br />

aibd<br />
aaaa<br />

### `ubuntu 18 command`
(code push to gitlab, not github)<br/>
git push <br/>
npm run deploy <br />

## Stage: Setup or Test
### `webapp`
npm install gh-pages --save-dev <br/>

(package.json) <br/>
"homepage": "https://aecom-clc.github.io/tictactoe/", <br/>
"scripts": {...<br/>
"deploy": "gh-pages -d build"}, ... <br/><br/>

rm -rf .git <br/>
git init <br/>
git add . <br/>
git commit -am "1st commit" <br/>
(or) <br/>
(git remote rename origin origin_gitlab) <br/><br/>

git remote add origin https://github.com/aecom-clc/tictactoe.git <br/>
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" <br/>
cat ~/.ssh/id_rsa.pub <br/>
(https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) <br/>
(settings -> SSH and GPG keys -> New SSH key / Add SSH key) -> Key (paste)) <br/>
git push <br/>
aecom-clc <br/>
va9aaaVa <br/>

<br/>
(https://jsnwork.kiiuo.com/archives/3147/git-github-%E5%87%BA%E7%8F%BE-%E3%80%8Cplease-make-sure-you-have-the-correct-access-rights-and-the-repository-exists-%E3%80%8D/) <br/>
(confirm --> origin git@github.com:aecom-clc/tictactoe.git)
(otherwise, modify ./.git/config)
git remote -v <br/>
[publish webapp on github]
npm run deploy <br/><br/>

[pull code on gitlab] <br/>
git push -u origin_gitlab master <br/>

[local test]
npm i <br/>
npm run start <br/>
(browser)<br/>
http://localhost:7002/react-tic-tac-toe/firstPlayer/Player1/secondPlayer/Player2


### `gitlab`
aecom.portal2@gmail.com <br/>
https://gitlab.com/profile/keys <br/>

### `github (seems no need to push source code, ONLY publish code)`
aecom.clc@gmail.com <br/>
aecom-clc <br/>
va9aaaVa <br/>
(create repository)<br/>
tictactoe <br/>

## Resources: .git/config

[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin_gitlab"]
	url = https://gitlab.com/aecom.portal2/game-tictactoe.git
	fetch = +refs/heads/*:refs/remotes/origin_gitlab/*
[branch "master"]
	remote = origin_gitlab
	merge = refs/heads/master
[remote "origin"]
	url = git@github.com:aecom-clc/tictactoe.git
	fetch = +refs/heads/*:refs/remotes/origin/*

## Resources: png to svg converter software (online)

https://onlineconvertfree.com/convert-format/png-to-svg/

aefernandosouzareacttictactoe632bcf2 <br/>
(change css -> scss)<br/>