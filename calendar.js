 /**
  * create_calendar('date','dates',1,2,0);
  */




var ARR_CALENDAR_SLIDER = {};
var ARR_CALENDAR_OBJ = {};
var date = new Date(),
    now_month=date.getMonth(),
    now_year=date.getFullYear(),
    mount_arr = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь","Январь"],
    day_arr= ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    serial_number;

var timeout_submit;
/**
 * кале
 * @param id_element_substitution
 * @param id_element_value
 * @param header_text
 * @returns
 */
function Obj_data_calendaer(id_element_substitution,id_element_value,header_text) {
    this.id_element_substitution = id_element_substitution;
    this.id_element_value = id_element_value;
    this.availability_button = availability_button;
    this.header_text = header_text;

}


Obj_data_calendaer.prototype={
    move:function(){
        alert('fd');
    }
};

/**
 * Создание календаря 
 * сразу рядом создается с элементом верстка
 * 
 * @param id  это с которым радом появится календарь
 * @param id_view скрытое поле куда класть
 * @param button  0|1  наличие кнопки 
 * @param number  порядковый номер
 * @param text   заголовок
 * @param target_class тип индефикатора элемента  1|0 deprecate
 */
function create_calendar(id,id_view,button,number,text,target_class){
	var clas = target_class;
    var calendar='',
        text_header='',
        polo,
        polo_left,
        width_window;
    if(text==0){
        text_header='Начало круиза/тура';
    }else{
        if(text==1){
            text_header='Окончание круиза/тура';
        }else{
            text_header=text;
        }
    }
    var box ={};
    box['id'] = id;
    box['id_view'] = id_view;
    box['number'] = number;
    box['slideid'] = '';
    box['button'] = button;
    
    ARR_CALENDAR_OBJ[number] = box;
    $(id).attr('data-type','open');
    $(id).attr('data-calendar-number',number);
    
    $(id).click(function(event){
        event.preventDefault();
        eventClick(this);
    });
    $(id).after('<div data-type="open" class="pod_calendar number_pod_calendar_'+number+' new"  data-curentslide-id=""  data-calendar-id="'+id+'"   data-calendar-view="'+id_view+'"  data-calendar-number="'+number+'"><div/>');
        //var target_this = $('.number_pod_calendar_'+number);
    
    calendar+='<div class="calendar calendar_'+number+'">';
    calendar+='<div class="headerCalendar headerCalendar_'+number+'">';
    calendar+='<span class="headerText">'+text_header+'</span>';
    calendar+='<div class="closeCalendar" data-type="close"  onclick="return eventClick(this);" >x</div>';
    calendar+='</div>';
    calendar+='<table class="days_week">';
    calendar+='<tr>';
    calendar+='<td><span class="days_week_text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>';
    for(var day_name=0;day_name<7; day_name++){
        calendar+='<td><span class="days_week_text">'+day_arr[day_name]+'</span></td>';
    }
    calendar+='</tr>';
    calendar+='</table>';
    calendar+='<ul class="bxslider bxslider_'+number+'" style="height: 100px;">';
    for(var day_num=0;day_num<13; day_num++){
        calendar+='<li><table id="p_'+number+'_'+day_num+'"></table></li>';
    }
    calendar+='</ul>';
    calendar+='<div id="bx-pager_'+number+'" class="bx-pager" style="float: left">';
    calendar+='<div class="content_month">';
    for(var year_num=0;year_num<12; year_num++){
        calendar+='<div id="a_'+number+'_'+year_num+'"> </div>';
    }
    calendar+='</div>';
    calendar+='</div>';
    calendar+='<div class="year_date">';
    calendar+='<div>';
    calendar+='<div class="menu_year menu_year_'+number+' active" id="year1" data-type="cur_year" data-year="'+(2014)+'"  onclick="return eventClick(this); "><div></div>2014</div>';
    calendar+='</div>';
    for(var pole_year=1;pole_year<4;pole_year++){
        calendar+='<div>';
        calendar+='<div class="menu_year menu_year_'+number+'" id="year'+(1+pole_year)+'" data-type="year"  data-year="'+(2014+pole_year)+'" onclick="return eventClick(this); "><div></div>'+(2014+pole_year)+'</div>';
        calendar+='</div>';
    }
    calendar+='</div>';
    if( ARR_CALENDAR_OBJ[number]['button']==1){
       /* calendar+='<button  type="button" class="button_start_search btn btn-info button_search_form" data-type="submit"   onclick="return eventClick(this);" ><i>Обновить параметры</i></button>';*/
    }
    calendar+='</div>';
    calendar+='</div>';
    $('.number_pod_calendar_'+number).html(calendar);


    width_window=$(window).width();


    polo=$(id).offset();
    
    polo_left=polo.left;
    if(Number(polo_left)<Number(width_window/2)){
        $('.pod_calendar').css('margin','-115px 0 0 114px')
    }else{
        $('.pod_calendar').css('margin','-115px 0 0 -512px')
    }

    //Запуск bxslider
    ARR_CALENDAR_SLIDER[number] = $('.bxslider_'+number).bxSlider({ 
        mode: 'vertical',
        slideMargin: 5,
        infiniteLoop: false,
        hideControlOnEnd: true,
        pagerCustom: '#bx-pager_'+number
    });
    start_render_calendar(number); // начало отрисовки календаря

    

}


/**
 * Начало отрисовкаи календаря
 * @param number
 * @param id
 * @param id_view
 * @param clas
 */
function start_render_calendar(target_this){
    Date.prototype.daysInMonth = function() {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };
    start_datepic(now_year,target_this);
    var number = ARR_CALENDAR_OBJ[target_this]['number'];
    var get_mount = getPageSelectorByActiveDay(target_this);
    $('#a_'+number+'_'+ get_mount).click();
    $('#number_one_'+number).click();
}




function start_datepic(year ,target_this){

	//console.assert(target_this != undefined, " target_this not DEFINE  ");

	var id = ARR_CALENDAR_OBJ[target_this]['id'];
	var id_view = ARR_CALENDAR_OBJ[target_this]['id_view'];
	var number = ARR_CALENDAR_OBJ[target_this]['number'];
	var CurrentDate = getDayFromInput(target_this);
	var current_month = CurrentDate.getMonth();
	
    if(year != now_year){
        for(var r=0;r<13;r++){
            t=r;
            if(r==12){
                t=0;
                year=year+1;
            }
            e=create_day(year, t, 1, mount_arr[r],number,id,id_view);
            $('#p_'+number+'_'+r).empty();
            $('#p_'+number+'_'+r).append(e);
            if((r<now_month)&&(now_year==year)){
                $('#a_'+number+'_'+r).empty();
                $('#a_'+number+'_'+r).append('<div class="month_none">'+mount_arr[r]+'</div>');
            }else{
                $('#a_'+number+'_'+r).empty();
                $('#a_'+number+'_'+r).append('<div class="trigert trigert_'+number+' triger'+r+' "  data-type="month"  onclick="return eventClick(this);" ><a class="mound_all" id="r_'+number+'_'+r+'"data-slide-index="'+r+'" >'+mount_arr[r]+'<div class="trigerTwo"></div></a></div>');
            }
        }
    }else{
        for(var r=0;r<13;r++){
            t=r;
            if(r==12){
                t=0;
                year=year+1;
            }
            if(r>now_month){
                e=create_day(year, t, 1, mount_arr[r],number,id,id_view);
                $('#p_'+number+'_'+r).empty();
                $('#p_'+number+'_'+r).append(e);
                if((r<now_month)&&(now_year==year)){
                    $('#a_'+number+'_'+r).empty();
                    $('#a_'+number+'_'+r).append('<div class="month_none">'+mount_arr[r]+'</div>');
                }else{
                    $('#a_'+number+'_'+r).empty();
                    $('#a_'+number+'_'+r).append('<div class="trigert trigert_'+number+' triger'+r+'"  data-type="month"  onclick="return eventClick(this);"><a class="mound_all" id="r_'+number+'_'+r+'"data-slide-index="'+r+'" >'+mount_arr[r]+'<div class="trigerTwo"></div></a></div>');
                }
            }else{
                if(r==now_month){
                    e=create_day(year, t, 1, mount_arr[r],number,id,id_view);
                    $('#p_'+number+'_'+r).empty();
                    $('#p_'+number+'_'+r).append(e);
                    $('#a_'+number+'_'+r).empty();
                    $('#a_'+number+'_'+r).append('<div class="trigert trigert_'+number+' triger'+r+'"  data-type="month"  onclick="return eventClick(this);"><a class="mound_all" id="r_'+number+'_'+r+'"data-slide-index="'+r+'" >'+mount_arr[r]+'<div class="trigerTwo"></div></a></div>');
                }else{
                    $('#a_'+number+'_'+r).empty();
                    $('#a_'+number+'_'+r).append('<div class="month_none">'+mount_arr[r]+'</div>');
                }
            }
        }
        
        $('#a_'+number+'_'+current_month+' .trigert').addClass('active');
    }
}



/**
 * Создание дней
 * 	Реализация подцветки
 * @param year
 * @param mount
 * @param day
 * @param mount_text
 * @param number
 * @param id_element
 * @param id_view
 * @param clas
 * @returns
 */
function create_day(year,mount,day,mount_text,number,id_element,id_view){
    var ld = getDayFromInput(number);
    q='<table class="name_month"><tr><td><img src="http://www.mcruises.ru/searchagency/all/next_blue.png"></td><td>&nbsp;&nbsp;'+mount_text+'&nbsp;</td><td>'+year+'</td></tr></table><table class="days_calendar">';
    for(var i=1; i<(Number(new Date(year, mount, day).daysInMonth())+Number([new Date(year, mount, day).getDay()]));i++){
        day_now=((i+1)-[new Date(year, mount, day).getDay()]);
        arrDateNow=ld.toLocaleDateString().split('.');
        if(ld.toLocaleDateString()==day_now+'.'+(mount+1)+'.'+year){
            if((((i)-[new Date(year, mount, day).getDay()])==1)&&(i%7==1)){
                q+='<tr><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="output days_text days_text_'+number+' active"  data-type="day"   data-day-d="'+day_now+'"  data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);">1</td></tr><tr>';
            }
            if((i%7==0)){
                if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                    q+='<td class="output days_text days_text_'+number+'" data-type="day"  data-day-d="'+day_now+'" data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);">'+day_now+'</td>';
                }else{
                    q+='<td class="days_text days_text_'+number+' active">'+''+'</td>';
                }
            }else{
                if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                    q+='<td class="days_text days_text_'+number+' active" data-type="day"   data-day-d="'+day_now+'"  data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);" >'+day_now+'</td>';
                }else{
                    q+='<td class="days_text days_text_'+number+' active">'+''+'</td>';
                }
            }
            if((i%7)==0){
                q+='</tr><tr>';
            }
        }else{
            if(((mount+1)<=(date.getMonth()+1))&&(year<=date.getFullYear())&&(day_now<date.getDate())){
                if((((i)-[new Date(year, mount, day).getDay()])==1)&&(i%7==1)){
                    q+='<tr><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="output no_active days_text days_text_'+number+'"  data-type="day"   data-day-d="'+1+'"  data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  >1</td></tr><tr>';
                }
                if((i%7==0)){
                    if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                        q+='<td class="output1 no_active days_text days_text_'+number+'" data-type="day"   data-day-d="'+day_now+'"    data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"   >'+day_now+'</td>';
                    }else{
                        q+='<td class="days_text no_active days_text_'+number+'" data-type="day"  data-day-d="'+day_now+'"   data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  >'+''+'</td>';
                    }
                }else{
                    if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                        q+='<td class="days_text  no_active days_text_'+number+'" data-type="day"   data-day-d="'+day_now+'"    data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"    >'+day_now+'</td>';
                    }else{
                        q+='<td class="days_text no_active days_text_'+number+'">'+''+'</td>';
                    }
                }
                if((i%7)==0){
                    q+='</tr><tr>';
                }
            }else{
                if((((i)-[new Date(year, mount, day).getDay()])==1)&&(i%7==1)){
                    q+='<tr><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="days_text"></td><td class="output days_text days_text_'+number+'"  data-type="day"   data-day-d="'+1+'"  data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);">1</td></tr><tr>';
                }
                if((i%7==0)){
                    if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                        q+='<td class="output days_text days_text_'+number+'" data-type="day"   data-day-d="'+day_now+'"    data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);"  >'+day_now+'</td>';
                    }else{
                        q+='<td class="days_text days_text_'+number+'" data-type="day"  data-day-d="'+day_now+'"   data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);">'+''+'</td>';
                    }
                }else{
                    if(((i+1)-Number([new Date(year, mount, day).getDay()]))>0){
                        q+='<td class="days_text days_text_'+number+'" data-type="day"   data-day-d="'+day_now+'"    data-day-m="'+(mount+1)+'"  data-day-y="'+year+'"  onclick="return eventClick(this);"  >'+day_now+'</td>';
                    }else{
                        q+='<td class="days_text days_text_'+number+'">'+''+'</td>';
                    }
                }
                if((i%7)==0){
                    q+='</tr><tr>';
                }
            }
        }
    }
    q+='</tr></table>';
return q;
}





/*'onclick="activeDay($(this),'+number+'); pushData('+day_now+','+(mount+1)+','+year+',\''+id_element+'\',\''+id_view+'\',\''+clas+'\'); timeout(\'number_pod_calendar_'+number+'\');"'
*/

/**
 * Контроллер кликов
 * @param it
 */
function eventClick(it){
	
	
	var typeElement = $(it).attr('data-type');
	
	var d_element = $(it).attr('data-day-d');
	var m_element = $(it).attr('data-day-m');
	var y_element = $(it).attr('data-day-y');
	if($(it).attr('data-calendar-number')){
		target_calendar = $(it);
	}else{
		target_calendar = $(it).parents('.pod_calendar');
	}

	var number = target_calendar.attr('data-calendar-number');
	target_this = number;
	var hide_element = 'number_pod_calendar_'+number;

	clearTimeout(timeout_submit); /* обрубание отправки */
	
	/* Клик по дню */
	if(typeElement == 'day'){
		saveSlideday(number,target_this);
		activeDay($(it),number);
		pushData(d_element,m_element,y_element,target_this);
		
		if(ARR_CALENDAR_OBJ[number]['button'] == 1){
			timeoutSubmit(target_this);
	    }else{
	    	timeoutClose(target_this);
	    }
	}
	
	/* Клик по году */
	if(typeElement == 'year'){
		var year = $(it).attr('data-year');
		start_datepic(year,target_this); 
		triger(it,number);
	}
	
	/* Клик по текущему году */
	if(typeElement == 'cur_year'){
		start_datepic(2014,target_this);
		triger(it,number);
		pageSelect = ARR_CALENDAR_OBJ[number]['slideid'];	
		if(pageSelect!=''){
			ARR_CALENDAR_SLIDER[number].goToSlide(pageSelect);
		}
		
	}
	
	/* Клик по месяцу */
	if(typeElement == 'month'){
		trigerTwo(it,number);
	}
	
	/* Открытие окна */
	if(typeElement == 'open'){

		$('.number_pod_calendar_'+number).show();
		start_datepic(2014,target_this); 
		$('#year1').click();
		initPageSlider(number,target_this);
		pageSelect = ARR_CALENDAR_OBJ[number]['slideid'];	
		if(pageSelect!=''){
			ARR_CALENDAR_SLIDER[number].goToSlide(pageSelect);
		}
	}
	
	/* Клик по принудительной отправке */
	if(typeElement == 'submit'){
		closeCalendar(target_this);
		$('#search_form_search_button').click();
	}
	
	/* Клик по закрытию окна */
	if(typeElement == 'close'){
		closeCalendar(target_this);
	}
	
	
	return false;
	
}

/**
 * Типа первая обработка  клика
 * @param odj
 * @param number
 * @param num
 */
function triger(odj,number,num){
    if(num!=1){
        $('.menu_year').removeClass('active');
        $(odj).toggleClass('active');
        $('#r_'+number+'_'+0).click();
    }else{
        $('.menu_year').removeClass('active');
        $(odj).toggleClass('active');
        $('#r_2_4').click();
    }
}


/**
 * Типа вторая обработка клика
 * @param odj
 * @param number
 */
function trigerTwo(odj,number){
    $('.trigert').removeClass('active');
    $(odj).toggleClass('active');
}

/**
 * Закрытие окна c отправкой
 * @param number
 */
function timeoutSubmit(target_this){
	timeout_submit = setTimeout( function() {
		closeCalendar(target_this);
        $('#search_form_search_button').click();
    } , 1000);
}


/**
 * Закрытие окна c задержкой
 * @param number
 */
function timeoutClose(target_this){
	timeout_submit = setTimeout( function() {
		closeCalendar(target_this);
    } , 1000);
}

/**
 * Закрытие окна
 * @param target_this
 */
function closeCalendar(target_this){
	var number = ARR_CALENDAR_OBJ[target_this]['number'];
	$('.number_pod_calendar_'+number).hide();
}


/**
 * Сохранение  позиции слайдера
 * @param number
 * @param target_this
 */
function saveSlideday(number,target_this){
	var slider =  ARR_CALENDAR_SLIDER[number];
	var current = slider.getCurrentSlide();
	ARR_CALENDAR_OBJ[target_this]['slideid'] = current;
}


/**
 * Определение страницы
 * @param number
 * @param target_this
 */
function initPageSlider(number,target_this){
	var curr = ARR_CALENDAR_OBJ[target_this]['slideid'];
	if(curr===''){
		ARR_CALENDAR_OBJ[target_this]['slideid'] = parseInt(getPageSelectorByActiveDay(target_this));  //slider.getCurrentSlide();
	}
	
}
/**
 * Установка даты в input
 * @param d
 * @param m
 * @param y
 * @param id
 * @param id_view
 * @param clas
 */
function pushData(d,m,y,target_this){
	var id = ARR_CALENDAR_OBJ[target_this]['id'];
	var id_view = ARR_CALENDAR_OBJ[target_this]['id_view'];
	var number = ARR_CALENDAR_OBJ[target_this]['number'];
	
    d=''+d;
    m=''+m;
    if(d.length==1)d='0'+d;
    if(m.length==1)m='0'+m;
    
    $(id).html('<p>'+d+'.'+m+'.'+y+'</p>');
    $(id).val(d+'.'+m+'.'+y);
    $(id_view).html('<p>'+d+'.'+m+'.'+y+'</p>');
    $(id_view).val(d+'.'+m+'.'+y);

}
/**
 * Типа подцветка дня
 * @param obj
 * @param number
 */
function activeDay(obj,number){
    $('.days_text_'+number).removeClass('active');
    $(obj).toggleClass('active');
}

/**
 * поиск страницы по выбранному дню
 * @param target_this
 * @returns int
 */
function getPageSelectorByActiveDay(target_this){
	var number = ARR_CALENDAR_OBJ[target_this]['number'];
	var indexPage = $('.number_pod_calendar_'+number+'  .bx-viewport .bxslider li').index($('.number_pod_calendar_'+number+'  .bx-viewport .bxslider li').has(' td.days_text.active'));	
	return indexPage;
}


/**
 * Получение данных из наведенного элемента
 * 
 * Разные варинты получения строки с датой
 * @param target_this
 * @returns
 */
function getDayFromInput(target_this){
	var id = ARR_CALENDAR_OBJ[target_this]['id'];
	var id_view = ARR_CALENDAR_OBJ[target_this]['id_view'];
	var dayfind,strDate;
	var localtime = new Date();
	
	strDate = $(id).find('p').html();  /* если p в элементе */
	dayfind = parsingTimeToArr(strDate);

	if((dayfind != false) && (localtime.getTime() < dayfind.getTime())){
		return dayfind;
	}
	
	strDate = $(id).val();   /* если input */
	dayfind = parsingTimeToArr(strDate);
	if((dayfind != false) && (localtime.getTime() < dayfind.getTime())){
		return dayfind;
	}
	
	strDate = $(id).html();   /*  если  просто тектс*/
	dayfind = parsingTimeToArr(strDate);
	if((dayfind != false) && (localtime.getTime() < dayfind.getTime())){
		return dayfind;
	}

	return localtime;

}

/**
 * Парсинг даты 
 * 
 * тут варианты парсинга по очереди должны идти
 * @param str
 * @returns
 */
function parsingTimeToArr(str){
	var ret;
	
	if(str!=''){
		dayfind = new Date()
		var dateParts = str.split(".");
		ret = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
		return ret;
	}
	
	return false

}


function dp(number) {
    $('.calendar_'+number).show();
}





