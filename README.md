# SGPA Calculator

A simple web application that calculates SGPA based on subject marks and credits.

[Open](https://dileep-raj.github.io/SGPA-Calculator) the calculator

## Calculating SGPA

### Grades and grade points

|Marks|Grade|Remark|Grade points|
|---|---|---|---|
| 90-100 | O | Outstanding  | 10 |
| 80-89 | A+ | Excellent | 9 |
| 70-79 | A | Very Good | 8 |
| 60-69 | B+ | Good | 7 |
| 55-59 | B | Above Average | 6 |
| 50-54 | C | Average | 5 |
| 40-49 | P | Pass | 4 |
| 0-39 | F | Fail | 0 |

>These grades are referred from [VTU 2021 regulations scheme](https://vtu.ac.in/pdf/regulations2021/finalreg2021.pdf)

Formula for calculating SGPA:
$$
\frac{\sum{(Grade Points * Credits)} }{TotalCredits}
$$


## Subjects and Credits

The subjects and credits are stored in `subjects.json` file

### How to add custom subjects and credits
You can add custom subjects and credits by selecting **Add subjects manually** in the drop down selection and entering the number of subjects
You can then enter each subject's name and credits

Or

You can refer to the below `json` format and add the subjects in the json file,

```
{
    "semester_key":{
        [
            "Subject_name",
            Credits (int),
            End semester exam (boolean)
        ],
        ...
    },
    ...
}
```

## Page theme
You can press the theme toggle button on the top right corner\
Alternatively, you can toggle theme by pressing `t` on your keyboard