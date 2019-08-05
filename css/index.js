let projectsWrapper = document.getElementsByClassName('projects')[0];  //프로젝트 소개 그룹 div
let projects = document.getElementsByClassName('project');	//상세 프로젝트 

let lignes = document.getElementsByClassName('ligne');//인디케이터 내부 div
for (let i = 0; i <  projects.length; i++) {
    let project = projects[i];
    let ligne = lignes[i];
    project.addEventListener('click', function () {
		alert(project);
        // reset all classname to project;
        for (let i = 0; i <  projects.length; i++) {
            let projectToReset = projects[i];
            project !== projectToReset ? unselectProjet(projectToReset, ligne) : null;
        }

        projectsWrapper.scroll({ top: project.offsetTop - project.offsetHeight, left: 0, behavior: 'smooth' });
    });
}

// Handle scrolling
projectsWrapper.addEventListener('scroll', function() {
    for (let i = 0; i <  projects.length; i++) {
        let project = projects[i];
        let ligne = lignes[i];

        let vPos = getVerticalPosition(project); 
        if (vPos <  project.offsetHeight / 2 || vPos > project.offsetHeight + project.offsetHeight / 2) {
            unselectProjet(project, ligne);
        } else if (vPos < project.offsetHeight + project.offsetHeight / 2) {
            selectProjet(project, ligne);
        }
    }
});

function getVerticalPosition (project) {
    let scrollPosition = projectsWrapper.scrollTop;
    return project.offsetTop - scrollPosition;
}

function selectProjet(project, ligne) {
    if (project.className === 'project selected') {
        return;
    }
    ligne.className = 'ligne active';
    project.className = 'project selected'; 
    const images = document.querySelectorAll('.background img');
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.dataset.id === project.dataset.id) {
            image.className = 'selected';
        } else {
            image.className = '';
        }
    }
}

function unselectProjet(project, ligne) {
    project.className = 'project'; 
    ligne.className = 'ligne';
}