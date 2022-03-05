
const $siteList = $('.siteList');
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
console.log(xObject);
const hashMap = xObject || [
  { logo: "Y", url: "https://www.youku.com/" },
  { logo: "I", url: "https://www.iqiyi.com/" },
  { logo: "L", url: "http://www.le.com/" },
  { logo: "T", url: "https://v.qq.com/" },
  { logo: "B", url: "https://www.bilibili.com/" },

];

const simplifyUrl = (url) => {
  const match = url.match(/([a-zA-Z0-9]+\.[a-zA-Z0-9]+)(\/.*)?$/)
  if (match && match[1]) {
    return match[1];
  }
  return url;
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`
    <li >    
            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>\
            <div class="close">
        <svg class="icon">
        <use xlink:href="#icon-close"></use>
        </svg>
        </div>   
          </div>
             
          </li>
  `).insertBefore($lastLi);
    //添加点击事件
    $li.on('click',()=>{
      window.open(node.url)
    })
    //添加删除事件
    $li.on('click','.close',(e)=>{
      e.stopPropagation()
      hashMap.splice(index,1)
      render()
    })


  });
};
render();

$('#addButton').on('click',()=>{
    let url = window.prompt('请问你要添加的网址是啥');
    if(url.indexOf('http')!==0){
        url = 'https://'+url;
    }
    
    hashMap.push({'logo':simplifyUrl(url)[0].toUpperCase()  ,'url': url});
    render();
})
//用户离开页面时，存储hashMap内容
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};


//键盘事件
$(document).on('keypress',(e)=>{
  const{key} = e
  for (let i = 0; i < hashMap.length; i++){
    if(hashMap[i].logo.toLowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
})
$('#search').on('keypress',(e)=>{
  e.stopPropagation()
})