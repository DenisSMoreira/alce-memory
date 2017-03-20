/* global memoryGameApp, MESSAGE_MATCH, MESSAGE_ONE_MORE, MESSAGE_MISS, returnMESSAGE_WON, MESSAGE_WON, MESSAGE_CLICK */
'use strict';
memoryGameApp.controller('GameCtrl', function GameCtrl($scope, $document) {

    var TILE_NAMES = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
        'that-guy', 'zeppelin'];

    $scope.game = new Game(TILE_NAMES);
    
    var myModalStart = document.getElementById('myModalStart');
    myModalStart.style.display = "block";
        

    $scope.click = function () {
        $document[0].getElementsByTagName('audio').audio.play();
        $scope.game = new Game(TILE_NAMES);
        var modal =  $document[0].getElementById('myModal');
        modal.style.display = "none";
        myModalStart.style.display = "none";
    };

    function Tile(title) {
        this.title = title;
        this.flipped = false;
    }

    Tile.prototype.flip = function () {
        this.flipped = !this.flipped;
    };

    function Game(tileNames) {
        var tileDeck = makeDeck(tileNames);

        this.grid = makeGrid(tileDeck);
        this.message = MESSAGE_CLICK;
        this.unmatchedPairs = tileNames.length;

        this.flipTile = function (tile) {
            if (tile.flipped) {
                return;
            }

            tile.flip();

            if (!this.firstPick || this.secondPick) {

                if (this.secondPick) {
                    this.firstPick.flip();
                    this.secondPick.flip();
                    this.firstPick = this.secondPick = undefined;
                }

                this.firstPick = tile;
                this.message = MESSAGE_ONE_MORE;

            } else {

                if (this.firstPick.title === tile.title) {
                    this.unmatchedPairs--;
                    this.message = (this.unmatchedPairs > 0) ? MESSAGE_MATCH : win();
                    this.firstPick = this.secondPick = undefined;
                } else {
                    this.secondPick = tile;
                    this.message = MESSAGE_MISS;
                }
            }
        };

        // Get the bu,tton that opens the modal
//        var btn = document.getElementById("myBtn");
        var modal = document.getElementById('myModal');

//        btn.onclick = function () {
//            modal.style.display = "block";
//        };

    }

    /* Create an array with two of each tileName in it */
    function win() {
        // Get the modal
        var modal = document.getElementById('myModal');
        modal.style.display = "block";

        return MESSAGE_WON;
    }

    /* Create an array with two of each tileName in it */
    function makeDeck(tileNames) {
        var tileDeck = [];
        tileNames.forEach(function (name) {
            tileDeck.push(new Tile(name));
            tileDeck.push(new Tile(name));
        });
        return tileDeck;
    }


    function makeGrid(tileDeck) {
        var gridDimension = Math.sqrt(tileDeck.length),
                grid = [];

        for (var row = 0; row < gridDimension; row++) {
            grid[row] = [];
            for (var col = 0; col < gridDimension; col++) {
                grid[row][col] = removeRandomTile(tileDeck);
            }
        }
        return grid;
    }


    function removeRandomTile(tileDeck) {
        var i = Math.floor(Math.random() * tileDeck.length);
        return tileDeck.splice(i, 1)[0];
    }

});

