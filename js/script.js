let digits = generate4RandomUniqueDigits()

function generate4RandomUniqueDigits() {
    let digits = ''
    while (digits.length < 4) {
        let d = Math.floor(Math.random() * 9);
        if (digits.indexOf(d) === -1)
            digits += d;
    }
    console.log(digits)

    return digits
}

// $(document).ready(function () {
//     console.log(digits)
// });

$('#input').on('keypress', function (e) {
    if (e.which == 13) {
        let input = $(this).val()

        if (validateInput(input)) {
            $(this).removeClass('background-red red')
            $('#msg').removeClass('red')

            let result = checkNumbers(input)

            $('table tbody').append(`<tr><td>${input}</td><td>${result.picas}</td><td>${result.fijas}</td></tr>`)

            $(this).val('')

            if(digits == input) {
                $('.overlay').show()
                $('#reset').click(function (e) {
                    reset()
                    $('.overlay').hide()
                })
            }
        } else {
            $(this).addClass('background-red red')
            $('#msg').addClass('red')
        }
    }
});

function validateInput(val) {
    let result = true

    if (val.length != 4) {
        result = false
    }

    let num = {}

    for (let i = 0; i < val.length; i++) {
        const e = val[i];

        if (num[e]) {
            result = false
            break;
        } else {
            num[e] = e
        }
    }

    return result
}

function checkNumbers(input) {
    let picas = 0
    let fijas = 0

    for (let i = 0; i < input.length; i++) {
        const d = digits.indexOf(input[i]);
        
        if(d == -1) { //if not exist
            continue
        }

        if(d == i) { //if position is correct
            fijas++
            continue
        }

        if(d != -1) { //if position is incorrect
            picas++
            continue
        }
    }

    return {picas, fijas}
}

function reset() {
    digits = generate4RandomUniqueDigits()
    $('table tbody tr').remove()
}