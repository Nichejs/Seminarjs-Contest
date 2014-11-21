$(document).ready(function () {
	reloadUsers();

	setInterval(reloadUsers, 5000);
});

function reloadUsers() {
	$.get('/api/contest/users', function (data) {
		var $tbody = $('#userListTable tbody');
		$tbody.html('');

		data.sort(compare);

		var usersLeft = data.length,
			round = 10,
			roundSetup = false;

		while (usersLeft > 0) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].contest.round !== round) continue;
				if (!roundSetup) $tbody.append('<h4>Nivel ' + (round + 1) + '</h4>');
				roundSetup = true;
				$tbody.append('<tr><td><div class="row-name">' + formatDate(data[i].contest.date) + ' <b>' + data[i].name + '</b> <small class="small-progress">[' + data[i].contest.progress + '%]</small></div><div class="row-progress" style="width:' + data[i].contest.progress + '%"></div></td></tr>');
				usersLeft--;
			}
			round--;
			roundSetup = false;
		}
	});
}

function formatDate(date) {
	return '<small>[' + moment(date).format("D-MMM HH:mm:ss", 'es') + ']</small>';
}

function compare(a, b) {
	if (a.contest.progress > b.contest.progress) {
		return -1;
	}
	if (a.contest.progress < b.contest.progress) {
		return 1;
	}
	if (moment(a.contest.date) < moment(b.contest.date)) {
		return -1;
	}
	if (moment(a.contest.date) > moment(b.contest.date)) {
		return 1;
	}
	return 0;
}