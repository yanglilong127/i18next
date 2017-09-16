require('./css/index.css');

import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

i18next
.use(XHR)
.init({
  lng: 'en',  //设置当前翻译的语言
  debug: true,  //开启debug模式
  whitelist:['en','simp_ch','tran_ch'],  //这只允许的语言列表
  backend:{
  	loadPath:'locales/{{lng}}.json'
  }
}, function(err, t) {
  // initialized and ready to go!
  updateContent();
});

//监听语言更新,语言变化执行此函数
i18next.on('languageChanged',()=>{
	updateContent();
});


function updateContent(){
  var $i18n=$('[data-i18n]');
  var i18n_lens=$i18n.length;
  //console.log($i18n.eq(0).data('i18n'));
  for(let i=0; i<i18n_lens; i++){
  	var i18n_val=$i18n.eq(i).data('i18n');
  	i18n_val=i18next.t(i18n_val);
  	$i18n.eq(i).text(i18n_val);
  }
};


$('#myselect').change(function(){
	var lang=$(this).val();
	i18next.changeLanguage(lang);
});