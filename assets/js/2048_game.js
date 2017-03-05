var playArr = []; //keeps track of all cells in 1D
var emptyArr = []; //keeps track of empty cells
var gameArr = []; //keeps track of filled cells
var score = 0;
randomCellGenerator = function () {
        var length = emptyArr.length;
        if (length === 0) {
            swal("Well Played! Score is " + score, "GAME OVER", "success")
            return -1;
        } else {
            var randomIndex = Math.floor((Math.random() * length));
            var randomValue = Math.floor((Math.random() * 2));
            if (randomValue === 0) {
                val = 2;
            } else {
                val = 4;
            }
        }
        var node = {
            id: emptyArr[randomIndex],
            value: val
        };
        return node;
    },
    addToBoard = function (node) {
        var index = gameArr.indexOf(node.id);
        if (index == -1) {
            gameArr.push(node.id);
            document.getElementById(node.id).innerHTML = node.value;

        }
        var index1 = emptyArr.indexOf(node.id);
        if (index1 !== -1) {
            emptyArr.splice(index1, 1);
        }
        var index2 = playArr.indexOf(node.id);
        if (index2 !== -1) {
            document.getElementById(node.id).innerHTML = node.value;
            //            var dummyNode = playArr[index2];
            //            dummyNode.value = node.value;
        }
        var clss = "cell" + node.value;
        document.getElementById(node.id).className = clss;
    },
    removeFromBoard = function (node) {
        var index = emptyArr.indexOf(node.id);
        if (index == -1) {
            emptyArr.push(node.id);
        }
        var index1 = gameArr.indexOf(node.id);
        if (index1 !== -1) {
            gameArr.splice(index1, 1);
        }
    },
    updateBothArray = function (id) {
        var p1 = document.getElementById(id).innerHTML;
        if (p1 === "") {
            var index = emptyArr.indexOf(id);
            if (index === -1) {
                emptyArr.push(id);
            }
            var index1 = gameArr.indexOf(id);
            if (index1 !== -1) {
                gameArr.splice(index1, 1);
            }
        } else {
            var index = gameArr.indexOf(id);
            if (index === -1) {
                gameArr.push(id);
            }
            var index1 = emptyArr.indexOf(id);
            if (index1 !== -1) {
                emptyArr.splice(index1, 1);
            }
        }
    },
    getValueFromId = function (id) {
        var value = document.getElementById(id).innerHTML;
        return value;
    },
    onSwap = function (id1, id2) {
        if (id1 !== id2) {
            var p1 = document.getElementById(id1).innerHTML;
            var p2 = document.getElementById(id2).innerHTML;
            document.getElementById(id1).innerHTML = p2;
            var clss = "cell" + p2;
            document.getElementById(id1).className = clss;
            document.getElementById(id2).innerHTML = p1;
            var clss1 = "cell" + p1;
            document.getElementById(id2).className = clss1;
            updateBothArray(id1);
            updateBothArray(id2);
        }

    },
    onMerge = function (id1, id2) {
        if (id1 !== id2) {
            var p1 = parseInt(document.getElementById(id1).innerHTML);
            var p2 = parseInt(document.getElementById(id2).innerHTML);
            document.getElementById(id1).innerHTML = p2 + p1;
            var sum = p1 + p2;
            var clss = "cell" + sum;
            document.getElementById(id1).className = clss;
            document.getElementById(id2).innerHTML = "";
            document.getElementById(id2).className = "emptyCell";
            score = score + p2 + p1;
            updateScoreCard();
            updateBothArray(id1);
            updateBothArray(id2);
        }

    },
    onTopPress = function () {
        //        console.log(emptyArr, gameArr);
        var v1, v2, v3, v4, i = 0,
            p = 0;
        var j = 4;
        var arr = [];
        while (j--) {

            v1 = getValueFromId(playArr[i]);
            v2 = getValueFromId(playArr[i + 4]);
            v3 = getValueFromId(playArr[i + 8]);
            v4 = getValueFromId(playArr[i + 12]);
            arr.push(v1);
            arr.push(v2);
            arr.push(v3);
            arr.push(v4);
            var count = p;
            var k = p,
                l = p,
                m = p;
            for (; k < p + 4; k++) { //to move left
                if (arr[k] !== "") {
                    var col = parseInt(k / 4);
                    var row = k % 4;
                    var col1 = parseInt(count / 4);
                    var row1 = count % 4;
                    onSwap(playArr[4 * row1 + col1], playArr[4 * row + col]);
                    arr[count] = arr[k];
                    count++;
                }
            }
            while (count < p + 4) {
                arr[count] = "";
                count++;
            }

            for (; l < p + 3;) { //to merge
                if (arr[l] === arr[l + 1] && arr[l] !== "") {
                    var col = parseInt(l / 4);
                    var row = l % 4;
                    var col1 = parseInt((l + 1) / 4);
                    var row1 = (l + 1) % 4;
                    onMerge(playArr[4 * row + col], playArr[4 * row1 + col1]);
                    arr[l + 1] = ""
                    l = l + 2;
                } else {
                    l++;
                }
            }
            count = p;
            for (; m < p + 4; m++) { //to move left
                if (arr[m] !== "") {
                    var col = parseInt(m / 4);
                    var row = m % 4;
                    var col1 = parseInt(count / 4);
                    var row1 = count % 4;
                    onSwap(playArr[4 * row1 + col1], playArr[4 * row + col]);
                    arr[count] = arr[m];
                    count++;
                }
            }
            while (count < p + 4) {
                arr[count] = "";
                count++;
            }
            i = i + 1;
            p = p + 4;
        }
        //        console.log(emptyArr, gameArr);
    },
    onDownPress = function () {
        //        console.log(emptyArr, gameArr);
        var v1, v2, v3, v4, i = 0,
            p = 0;
        var j = 4;
        var arr = [];
        while (j--) {

            v1 = getValueFromId(playArr[i]);
            v2 = getValueFromId(playArr[i + 4]);
            v3 = getValueFromId(playArr[i + 8]);
            v4 = getValueFromId(playArr[i + 12]);
            arr.push(v1);
            arr.push(v2);
            arr.push(v3);
            arr.push(v4);
            var count = p + 3;
            var k = p + 3,
                l = p + 3,
                m = p + 3;
            for (; k >= p; k--) { //to move left
                if (arr[k] !== "") {
                    var col = parseInt(k / 4);
                    var row = k % 4;
                    var col1 = parseInt(count / 4);
                    var row1 = count % 4;
                    onSwap(playArr[4 * row1 + col1], playArr[4 * row + col]);
                    arr[count] = arr[k];
                    count--;
                }
            }
            while (count >= p) {
                arr[count] = "";
                count--;
            }

            for (; l > p;) { //to merge
                if (arr[l] === arr[l - 1] && arr[l] !== "") {
                    var col = parseInt(l / 4);
                    var row = l % 4;
                    var col1 = parseInt((l - 1) / 4);
                    var row1 = (l - 1) % 4;
                    onMerge(playArr[4 * row + col], playArr[4 * row1 + col1]);
                    arr[l - 1] = "";
                    l = l - 2;
                } else {
                    l--;
                }
            }
            count = p + 3;
            for (; m >= p; m--) { //to move left
                if (arr[m] !== "") {
                    var col = parseInt(m / 4);
                    var row = m % 4;
                    var col1 = parseInt(count / 4);
                    var row1 = count % 4;
                    onSwap(playArr[4 * row1 + col1], playArr[4 * row + col]);
                    arr[count] = arr[m];
                    count--;
                }
            }
            while (count >= p) {
                arr[count] = "";
                count--;
            }
            i = i + 1;
            p = p + 4;
        }
        //        console.log(emptyArr, gameArr);
    },
    onLeftPress = function () {
        //        console.log(emptyArr, gameArr);
        var v1, v2, v3, v4, i = 0;
        var j = 4;
        var arr = [];
        while (j--) {

            v1 = getValueFromId(playArr[i]);
            v2 = getValueFromId(playArr[i + 1]);
            v3 = getValueFromId(playArr[i + 2]);
            v4 = getValueFromId(playArr[i + 3]);
            arr.push(v1);
            arr.push(v2);
            arr.push(v3);
            arr.push(v4);
            var count = i;
            var k = i,
                l = i,
                m = i;
            for (; k < i + 4; k++) { //to move left
                if (arr[k] !== "") {
                    onSwap(playArr[count], playArr[k]);
                    arr[count] = arr[k];
                    count++;
                }
            }
            while (count < i + 4) {
                arr[count] = "";
                count++;
            }

            for (; l < i + 3;) { //to merge
                if (arr[l] === arr[l + 1] && arr[l] !== "") {
                    onMerge(playArr[l], playArr[l + 1]);
                    arr[l + 1] = ""
                    l = l + 2;
                } else {
                    l++;
                }
            }
            count = i;
            for (; m < i + 4; m++) { //to move left
                if (arr[m] !== "") {
                    onSwap(playArr[count], playArr[m]);
                    arr[count] = arr[m];
                    count++;
                }
            }
            while (count < i + 4) {
                arr[count] = "";
                count++;
            }
            i = i + 4;
        }
        //        console.log(emptyArr, gameArr);
    },
    onRightPress = function () {
        //        console.log(emptyArr, gameArr);
        var v1, v2, v3, v4, i = 0;
        var j = 4;
        var arr = [];
        while (j--) {

            v1 = getValueFromId(playArr[i]);
            v2 = getValueFromId(playArr[i + 1]);
            v3 = getValueFromId(playArr[i + 2]);
            v4 = getValueFromId(playArr[i + 3]);
            arr.push(v1);
            arr.push(v2);
            arr.push(v3);
            arr.push(v4);
            var count = i + 3;
            var k = i + 3,
                l = i + 3,
                m = i + 3;
            for (; k >= i; k--) { //to move left
                if (arr[k] !== "") {
                    onSwap(playArr[count], playArr[k]);
                    arr[count] = arr[k];
                    count--;
                }
            }
            while (count >= i) {
                arr[count] = "";
                count--;
            }

            for (; l > i;) { //to merge
                if (arr[l] === arr[l - 1] && arr[l] !== "") {
                    onMerge(playArr[l], playArr[l - 1]);
                    arr[l - 1] = "";
                    l = l - 2;
                } else {
                    l--;
                }
            }
            count = i + 3;
            for (; m >= i; m--) { //to move left
                if (arr[m] !== "") {
                    onSwap(playArr[count], playArr[m]);
                    arr[count] = arr[m];
                    count--;
                }
            }
            while (count >= i) {
                arr[count] = "";
                count--;
            }
            i = i + 4;
        }
        //        console.log(emptyArr, gameArr);
    },
    handleKeyPress = function () {
        $(document).keydown(function (e) {
            switch (e.which) {
            case 37: // left
                onLeftPress();
                var newPosition = randomCellGenerator();
                addToBoard(newPosition);
                break;

            case 38: // up
                onTopPress();
                var newPosition = randomCellGenerator();
                addToBoard(newPosition);
                break;

            case 39: // right
                onRightPress();
                var newPosition = randomCellGenerator();
                addToBoard(newPosition);
                break;

            case 40: // down
                onDownPress();
                var newPosition = randomCellGenerator();
                addToBoard(newPosition);
                break;

            default:
                return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    },
    updateScoreCard = function () {
        var para = document.getElementById("scoreCard");
        para.innerHTML = "Score : " + score;
    },
    onGameStart = function () {

        var divGrid = document.getElementById("gameGrid");
        var gameGrid = document.createElement("table");
        gameGrid.className = "table1";
        var gameGridBody = document.createElement("tbody");
        for (var i = 0; i < 4; i++) {
            var row = document.createElement("tr");

            row.className = "row";
            for (var j = 0; j < 4; j++) {
                var cell = document.createElement("td");
                var cellId = i + "id" + j;
                var val = "";
                var node = {
                    id: cellId,
                    value: val
                };
                playArr.push(node.id);
                cell.innerHTML = node.value;
                cell.setAttribute("id", i + "id" + j);
                cell.className = "emptyCell";
                row.append(cell);

                emptyArr.push(node.id);
            }
            gameGridBody.appendChild(row);
        }
        gameGrid.appendChild(gameGridBody);
        divGrid.append(gameGrid);
        var start1, start2;
        //console.log(playArr);
        start1 = this.randomCellGenerator();
        addToBoard(start1);
        start2 = this.randomCellGenerator();
        addToBoard(start2);
        //console.log(playArr);

        handleKeyPress();

    },
    onPressRestart = function () {
        gameArr = [];
        emptyArr = [];
        playArr = [];
        var parent = document.getElementById("gameGrid");
        var child = document.getElementsByTagName("table")[0];
        parent.removeChild(child);
        onGameStart();
    }

window.onGameStart();


//onPressUndo= function () {
//
//    },