function ProcessCommand(data) {
    var params = {
        "Command": ""
    };

    $.get("settings.txt", function (settings) { })
        .done(function (settings) {
            var lines = settings.replace(' ','').split("\n");
            $.each(lines, function (i) {
                if (lines[i][0] == '/' || lines[i].charCodeAt(0)==13 || lines[i]=="\n")
                    return;
                var items = lines[i].split(',');
                if (
                    ((data.Command == items[0] && data.Type == BB.Type.USERCOMMAND) ||
                    (data.Type == BB.Type.CHEER &&  Number(data.Amount) >= Number(items[3]) && Number(items[3]) > 0)) &&
                    Number(items[2]) <= Number(data.User.Currency))
                {
                    var audio = new Audio('sounds/'+items[1]);
                    audio.volume = 0.1;
                    audio.play();
                    if (settings[2]>0)
                        RemoveCurrency(settings[2], data.User.UserName);
                    return false;
                }
                    
            });
        });

    //Don't touch this. 
    if (params.Command != "") {
        //send params back to server
        streamerhub.server.send(token, params);
    }

}

//use this function wherever you want something to cost currency
function RemoveCurrency(amount, username) {
    var params = {
        "Command": ""
    };

    params.Command = BB.Commands.CURRENCY;
    params.Action = 'subtract';
    params.Amount = amount;
    params.Username = username;
    streamerhub.server.send(token, params);
}// JavaScript source code
