# DrivingTestFinder-UK

## This addon hasn't extensively been tested and may break in the future.
## I by no means guarantee that this browser addon will find you a new test or will not malfunction, please do not use if your unsure, last tested on 18/10/2020.
## This addon also requires firefox.

## Configuration
This browser extension is my first extension ever and as such requires some manual configuration.
At the top of the script there is a variable called `defaultChoice` this needs to be your current driving test date in the format of `YYYY-MM-DD`, single digit days / months need to be written as `03` instead of `3`.

## Loading
To load this addon navigate to about:debugging#/runtime/this-firefox and load a temporary addon, then point to the manifest file in a cloned copy of this repository.

## Usage
When you first log in to rebook your driving test the browser addon will automatically check for a new date, if one is found then an alert box will appear with the specific date.
If one is not found then after 5 minutes, by default, then the browser addon will loop checking again. Note this addon does require constant monitoring as driving test dates cannot be reserved and I did not have enough time / chances to program the automatic booking of tests.

## License
This addon is licensed under MIT no attribution, the license text of which can be found in the `LICENSE` file in this repository.
