var getAbsoluteUrl = (function() {
	var a;
	return function(url) {
		if(!a) a = document.createElement('a');
		a.href = url;

		return a.href;
	};
})();

$(document).ready(function() {
	console.log('jquery');
});

var app = angular.module('data', []);

app.controller("users",["$scope",'$http', function(pro, ht) {
	var students = getAbsoluteUrl('db.json');
	var maininfo = null;
	pro.pics = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
	pro.editor = null; pro.ngShow = false; pro.showPop = false; pro.showPop2 = false; pro.addition = null;
	ht.get(students)
		.success(function(data) {
			maininfo = data;
		})
		.then(function() {
			pro.students = maininfo;
		}, function() {
			console.log('There was an error');
		});



	pro.edit = function(id) {
		var editor = null;
		$.each(pro.students, function() {
			var me = $(this)[0];
			if(me["id"] == id) {
				editor = me;
			}
		});
		pro.editor = editor;
		pro.showPop = true;
	}

	pro.add = function() {
		console.log('working');
		pro.showPop2 = true;
	}

	pro.save = function() {
		console.log(pro.editor);
		$.each(pro.students, function() {
			var me = $(this)[0];
			if(me['id'] == pro.editor['id']) {
				me = pro.editor;
			}
		});
		pro.showPop = false;
	}

	pro.save2 = function() {
		pro.students.push(pro.addition);
		pro.addition = null;
		pro.showPop2 = false;
	}

	pro.cancelPop = function() {
		pro.showPop = false;
	}

	pro.cancelPop2 = function() {
		pro.showPop2 = false;
	}
}]);