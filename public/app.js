var activeID=null;

function reply_click(clicked_id){
    activeID = clicked_id;
    //update active element
    document.getElementsByClassName('activeElement')[0].innerText=activeID;
    console.log("active : "+activeID);
    
}

function update(jscolor) {
    document.getElementById(activeID).style.fill = '#' + jscolor;
}


angular.module("myApp", ['color.picker']).controller("myCtrl", function ($scope, $http) {
    $scope.generating = false;

    $scope.icons = [
        {
            'id': 'vscode',
            'name': 'Visual Studio Code',
            'description': 'code development'
        },
        {
            'id': 'atom',
            'name': 'Atom',
            'description': 'code development'
        },
        {
            'id': 'sublime',
            'name': 'Sublime Text',
            'description': 'code development'
        },
        {
            'id': 'digitalocean',
            'name': 'DigitalOcean',
            'description': 'code deployment'
        },
        {
            'id': 'edge',
            'name': 'Edge',
            'description': 'code development'
        },
        {
            'id': 'youtube',
            'name': 'Youtube',
            'description': 'code development'
        },
        {
            'id': 'linkedIn',
            'name': 'LinkedIN',
            'description': 'code development'
        },
        {
            'id': 'chrome',
            'name': 'Chrome',
            'description': 'code development'
        }
    ];
    $scope.icon = {
        'index': 0,
    };

    $scope.submit = function () {
        $scope.generating = true;

        var image = document.getElementById("image");
        image = image.outerHTML.replace('{{ background }}', $scope.background);
        image = image.replace(/{{ accent }}/g, $scope.accent);

        $http.post('/api/convert', {'image': image}).then(res => {
            $scope.generating = false;

            name = res.data;
            window.location.href = '/api/download/' + name;
        }, err => {
            console.log(err);
        });
    };

    $scope.pickerOptions = {
        alpha: false,
        format: 'hex',
        swatchOnly: true
    };

    $scope.goNext = function (){
      $scope.icon.index = $scope.icon.index + 1;
      $scope.icon.animation = 'fade-in fade-right';
    }

    $scope.goPrevious = function (){
      $scope.icon.index = $scope.icon.index - 1;
      $scope.icon.animation = 'fade-in fade-left';
    }

});
