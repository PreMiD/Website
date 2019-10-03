const fs = require("fs");
const axios = require("axios");
const emoji = require("node-emoji");
const chalk = require("chalk");

let apiURL = "https://api.premid.app/v2/langFile";
let successEmoji = emoji.emojify("✔️");

process.stdout.write("\u001b[2J\u001b[0;0H");

axios
  .get(apiURL + "/list")
  .then(function(response) {
    console.log(chalk.green(`${successEmoji} Language list fetched.`));
    response.data.forEach(function(lang) {
      axios.get(apiURL + "/website/" + lang).then(function(responce) {
        if (responce.data["header.language"] !== "English" || lang == "en") {
          var langJSON = JSON.stringify(responce.data);
          var savePath = __dirname + `/src/langs/${lang}.json`;

          fs.writeFile(savePath, langJSON, function(err) {
            if (err) {
              return console.error(err);
            }
            console.log(
              chalk.green(
                `${successEmoji} Successfully fetched and saved ${lang} to ${savePath}.`
              )
            );
          });
        } else {
          console.warn(
            chalk.yellow(
              `Language ${lang} has no translation for 'header.language', copying aborted.`
            )
          );
        }
      });
    });
  })
  .catch(function(error) {
    console.error(error);
  });
