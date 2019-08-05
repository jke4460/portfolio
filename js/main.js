$(document).ready(function () {
    var $menuBtn = $('#menuBtn');
    var $closeBtn = $('#closeBtn');
    $menuBtn.on('click', function () {
        $('#gnb').css({display:'block'});
    });
    $closeBtn.on('click', function () {
        $('#gnb').css({display:'none'});
    });
    $menuBtn.on('mouseenter', function () {
       $(this).addClass('on');
    });
    $menuBtn.on('mouseleave', function () {
       $(this).removeClass('on');
    });


    var $projectsWrapper = $('.wrap');  //프로젝트 소개 그룹 div
	var $projects = $('.project');			//상세 프로젝트 
	var $lines = $('#indicator .line');		//인디케이터 내부 div

	//상세 프로젝트 $projects의 최초 offset().top을 배열에 저장
	var posArr = new Array();
	$projects.each(function () {
		posArr.push($(this).offset().top);
	});
	//console.log(posArr);

	//스크롤 되면
	$projectsWrapper.on('scroll', function () {

		//상세 프로젝트를 하나씩 순회
		$projects.each(function (idx) {
			var $project = $(this);		//현재 순회중인 상세 프로젝트 하나
			var $line = $lines.eq(idx);	//인디케이터 내부의 라인(프로젝트와 같은 인덱스 번호를 가진)

			//상세컨텐츠의 offset().top 에서 .projects에서 스크롤바가 이동한 거리를 빼어 그 크기를 비교함
			var vPos = posArr[idx] - $projectsWrapper.scrollTop();
			var projectHei = $project.outerHeight(true); //브라우저의 ⅓ 높이로 지정되어 있음

			//조건을 만족하는 경우 활성과 비활성을 지정함
			//스크롤이 브라우저의 ⅓ 지점에 위치할 경우 활성화 시킨다(⅓~⅔ => ²/6~⁴/6) : 단 스크롤 속도를 고려하여 조금 상단(¹/6~³/6)부터 실행시키기
			if (vPos < projectHei / 2 || vPos > projectHei + projectHei / 2) {
				unselectProjet($project, $line);		//함수를 호출하여 상세 프로젝트, 인디케이터 라인을 동시에 제어
			}
			else {
				selectProjet($project, $line);			//함수를 호출하여 상세 프로젝트, 인디케이터 라인을 동시에 제어
			}
		});
	});

	//선택된 상세프로젝트는 project라는 매개변수에, 선택된 인디케이터 라인은 line에 담겨 호출함
	function selectProjet(project, line) {
		//활성화 되어 있는 상태라면 강제종료
		if (project.attr('class') === 'project selected') return false;

		//비활성 상태일 경우만 상세프로젝트에는 project selected, 인디케이터 라인에는 line active 라는 클래스명을 추가한다
		project.attr('class', 'project selected');	//css에서 opacity와 padding을 transition 시키기
		line.attr('class', 'line active');			//css에서 opacity와 width을 transition 시키기
		
		//fixed로 고정된 .background 내부의 이미지는 absolute 속성으로 동일한 data-id를 가지고 있는 이미지를 찾아 .selected를 추가해서 투명도 1과 크기 100%를 가지게 하고 나머지 이미지는 투명도 0과 크기 0.95로 축소 transform: scale(0.95)
		$('.background img').each(function () {
			if ($(this).data('id') === project.data('id')) $(this).addClass('selected').siblings().removeClass();
		});

	}

	function unselectProjet(project, line) {
		project.removeClass('selected'); 
		line.removeClass('active');
	}
    
});