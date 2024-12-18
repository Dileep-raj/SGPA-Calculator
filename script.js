var semSubjects = {};
fetch("./subjects.json").then(response => response.json()).then(data => semSubjects = data)

const theadings = ['Subjects', 'Marks', 'Credits', 'Total', 'Gradepoint', 'Credits * GP']
const sgpa = document.createElement('div');
sgpa.id = "sgpa";
sgpa.className = "m-4";


//Toggles the theme of the page
function toggletheme() {
    document.body.classList.toggle("dark");
    themeToggleButton.classList.toggle("dark");
    if (themeToggleButton.innerHTML == "Light")
        themeToggleButton.innerHTML = "Dark";
    else
        themeToggleButton.innerHTML = 'Light';
}

//Creates a table dynamically
function createTable(val) {
    var table = document.createElement("table");
    table.id = "subtable";
    table.className = "table table-striped";
    tablearea.innerHTML = '';
    sgpa.innerHTML = '';
    sgpa.style.padding = "0px";

    //returns if the value is none
    if (val == 'none')
        return;

    var row = document.createElement('tr');
    //creating headings
    for (const heading of theadings) {
        var th = document.createElement('th');
        th.className = "tableheading text-center";
        th.scope = "col";
        th.appendChild(document.createTextNode(heading));
        row.appendChild(th);
    }
    table.appendChild(row);

    if (val == 'manual')
        manualtable(table);
    else {
        var num_subjects = document.getElementById('noofsubjects')
        if (num_subjects)
            num_subjects.remove();
        //creating rows passing sub as parameter
        for (const subject of semSubjects[val]) {
            row = createRow(subject);
            table.appendChild(row);
        }
        totalRow = createTotalRow()
        table.appendChild(totalRow)
        tablearea.appendChild(table);
        document.getElementById("result").appendChild(sgpa);
    }
}

//creates a table with manual number of subjects
function manualtable(table) {
    var num_subjects = document.getElementById('noofsubjects');
    if (num_subjects == null) {
        var input = document.createElement('input');
        input.id = 'noofsubjects';
        input.setAttribute('type', 'number');
        input.setAttribute('onchange', 'createTable("manual")');
        input.setAttribute('placeholder', 'Enter no of subjects');
        document.body.appendChild(input);
    }
    else if (parseInt(num_subjects.value) > 0) {
        //creating rows
        for (i = 1; i <= parseInt(num_subjects.value); i++) {
            row = createRow(0);
            table.appendChild(row);
        }
        totalRow = createTotalRow()
        table.appendChild(totalRow)
        tablearea.appendChild(table);
        document.getElementById("result").appendChild(sgpa);
    }
}

function createTotalRow() {
    const totalRow = document.createElement("tr")
    totalRow.id = "totalRow"
    const totalDivision = createDivision()
    totalDivision.appendChild(document.createTextNode("Total"))
    totalDivision.className = "tableheading text-center"
    totalRow.append(totalDivision, createDivision(), createDivision(), createDivision(), createDivision(), createDivision())
    return totalRow
}

//creates a row with all the table divisions
function createRow(sub) {
    const row = document.createElement('tr'), textInput = document.createElement('input'), numInput = document.createElement('input');
    textInput.setAttribute('type', 'text');
    numInput.setAttribute('type', 'number');
    var subject = createDivision(), marks = createDivision(), credits = createDivision(), total = createDivision(), gradepoint = createDivision(), cigi = createDivision();
    var cie = createInput('cie'), see = createInput('see');

    if (isNaN(sub)) {
        subject.appendChild(document.createTextNode(sub[0]));
        credits.appendChild(document.createTextNode(sub[1]));
        marks.appendChild(cie);
        if (sub[2])
            marks.appendChild(see);
    }
    else {
        subject.appendChild(textInput);
        credits.appendChild(numInput);
        marks.appendChild(cie);
        marks.appendChild(see);
    }

    row.appendChild(subject);
    row.appendChild(marks);
    row.appendChild(credits);
    row.appendChild(total);
    row.appendChild(gradepoint);
    row.appendChild(cigi)
    return row;
}

//Creates and returns table division element
function createDivision() {
    var obj = document.createElement('td');
    obj.className = 'fields';
    return obj;
}

//Creates and returns input element with attributes
function createInput(cls) {
    var obj = document.createElement('input');
    obj.setAttribute("type", "number");
    obj.setAttribute("value", "0");
    obj.setAttribute("min", "0");
    // obj.setAttribute("onchange", "compute()");
    obj.setAttribute("onclick", "this.value=''");
    obj.setAttribute("max", (cls == 'cie') ? 50 : 100);
    obj.setAttribute('placeholder', cls.toUpperCase());
    obj.className = 'marks ' + cls;
    obj.addEventListener("change", compute)
    obj.addEventListener("keyup", compute)
    obj.addEventListener("click", compute)
    return obj;
}

//Computes total marks and gradepoints for each subject
function compute() {
    const table = document.getElementById("subtable")
    const rows = table.getElementsByTagName('tr')
    var tot = 0, gp = 0, tgp = 0, totalcredits = 0;
    for (i = 1; i < rows.length - 1; i++) //start from the second row since first row is headings
    {
        const children = rows[i].children
        var marks = children[1].querySelectorAll("input"), credit = parseInt(children[2].innerHTML), total = children[3], gp = children[4], cigi = children[5];
        tot = 0;
        if (isNaN(credit)) {
            credit = parseInt(children[2].children[0].value);
            if (isNaN(credit))
                credit = 0
        }
        if (marks[0].value)
            tot = parseInt(marks[0].value);
        if (marks[1] && marks[1].value)
            tot += parseInt(marks[1].value) / 2;
        total.innerHTML = tot;
        var grade = gradepoint(tot);

        gp.innerHTML = grade;
        grade *= credit;
        cigi.innerHTML = grade;

        tgp += grade;
        totalcredits += credit;
    }

    // Print total credits and total grade points
    rows[rows.length - 1].children[2].innerHTML = totalcredits
    rows[rows.length - 1].children[5].innerHTML = tgp

    const SGPAValue = (Math.round(100 * tgp / totalcredits) / 100).toFixed(2)
    sgpa.style.padding = "10px";
    sgpa.innerHTML = "Your SGPA: " + SGPAValue;
}

//returns gradepoint
function gradepoint(m) {
    if (m >= 90)
        return 10;
    else if (m >= 80)
        return 9;
    else if (m >= 70)
        return 8;
    else if (m >= 60)
        return 7;
    else if (m >= 55)
        return 6;
    else if (m >= 50)
        return 5;
    else if (m >= 40)
        return 4;
    else
        return 0;
}

// Converts SGPA/CGPA to percentage
function percent(e) {
    const CGPAValue = e.target.value
    if (CGPAValue > 10 || CGPAValue < 0 || isNaN(CGPAValue)) {
        cgpa_input.style.borderColor = "Red"
        cgpa_per.innerHTML = "Enter valid CGPA!";
    }
    if (CGPAValue <= 10 && CGPAValue >= 0) {
        cgpa_per.innerHTML = "Percentage : " + ((parseFloat(CGPAValue) - 0.75) * 10).toFixed(2) + "%";
        if (CGPAValue == "" || CGPAValue == null)
            cgpa_per.innerHTML = ""
        cgpa_input.style.borderColor = ""
    }
}