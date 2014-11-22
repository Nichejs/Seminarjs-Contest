/**
 * Nodejs Contest system for Seminarjs
 */

var bodyParser = require('body-parser'),
  User = require('./models/User.js');

module.exports = function (seminarjs) {
  console.log("[Start] Seminarjs Contest server");

  // Contest data, should also come from the db at some point
  // this might change quite a lot in future versions

  var contestData = [
    // Round 1: Objetos
    {
      input: [
        '{"0":1,"1":10,"2":[{"1":["yea",109,null],"test":"hey","no way":"nope"},"hey",34],"y mas aun":[1,2,3,"1","2"],"otros":["a",1888],"ok":[[[[[[[[[[[[[[[["ok"]]]]]]]]]]]]]]]]}',
        '{"yea":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"a":{"nope":[1,2,3],"yes":"yes"}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}',
        '{"what":[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[{"a":[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[{"a":[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[{"a":"hello :)"}]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}',
        ''
      ],

      output: [
        '8',
        '1',
        '1'
      ]
  },
  // Round 2: Binaria
    {
      'input': [],
      'output': []
  },
  // Round 3: Tesoro
    {
      'input': [],
      'output': []
  },
  // Round 4: Interval
    {
      input: [
    '4 7 6 3 2 1 5',
    '30 14 13 34 38 12 3 10 36 22 1 29 6 39 15 28 33 21 5 31 17 16 32 18 25 35 40 4 7 11 27 20 9 8 37 23 24 2 19 26',
    '46 11 25 52 21 45 33 28 20 40 24 12 6 48 32 37 27 7 43 18 1 49 8 29 2 50 23 10 9 17 30 47 5 26 4 13 19 16 51 15 36 22 44 14 38 34 35 39 42 41 31 3',
    '649 553 282 21 676 564 29 679 86 584 593 482 384 737 153 146 232 122 542 392 431 717 560 211 443 394 372 41 823 366 759 390 230 716 829 60 98 718 258 449 261 40 499 39 14 559 298 376 72 569 301 242 284 588 796 451 222 453 311 281 563 179 661 56 680 625 522 124 790 566 249 674 607 157 246 815 707 9 825 171 163 1 509 752 71 283 574 70 516 184 792 819 296 288 484 33 102 595 687 697 351 789 133 492 66 408 312 488 733 728 251 401 422 508 290 216 594 100 95 448 668 135 711 411 156 582 486 772 743 480 826 415 576 762 6 425 404 74 447 714 119 309 342 660 807 142 446 493 304 343 634 329 501 78 185 340 318 632 636 166 118 545 557 554 73 487 227 496 130 69 264 62 721 58 31 215 177 469 802 315 662 666 658 477 502 436 413 732 383 245 420 515 657 430 629 364 747 331 619 162 403 206 324 2 544 165 459 378 328 505 710 88 272 503 313 110 236 606 48 528 104 218 712 219 151 276 456 791 824 207 659 539 665 708 773 407 12 201 362 137 818 570 240 507 250 577 719 416 656 15 145 532 26 543 99 208 81 116 280 106 319 643 109 267 653 189 388 572 330 795 365 164 91 694 352 412 386 556 552 262 756 640 139 536 672 444 567 627 175 338 131 414 722 107 152 827 360 788 612 598 34 68 797 391 592 344 38 203 637 358 686 294 355 231 327 481 760 316 389 639 651 581 809 551 325 586 511 738 200 244 589 755 673 766 158 602 513 382 188 510 605 293 17 786 441 213 53 181 626 549 368 129 677 530 254 787 27 385 421 439 13 450 538 214 367 278 169 111 332 782 562 292 506 417 699 326 519 804 739 210 24 695 642 613 339 140 746 23 458 783 371 620 197 555 76 322 633 79 821 631 274 396 432 779 535 255 57 237 275 7 279 734 621 426 170 579 813 204 5 61 435 45 117 82 97 512 235 578 115 801 297 273 730 483 811 234 705 533 173 405 641 253 742 550 500 138 455 814 141 618 758 468 239 628 525 257 42 67 121 398 127 701 704 221 128 615 226 241 64 178 155 689 80 749 399 90 323 614 571 190 810 781 374 768 302 271 736 558 667 397 400 252 713 442 93 198 144 753 735 238 770 654 462 3 266 457 683 489 664 635 724 671 37 778 761 474 306 84 300 263 89 30 341 702 548 123 229 445 740 25 147 168 243 354 648 193 4 816 681 289 799 393 517 429 223 767 172 286 159 308 180 295 741 113 822 617 191 497 611 495 682 406 777 167 609 565 784 616 437 670 723 645 709 75 547 336 357 348 800 575 409 438 381 590 534 125 485 470 16 498 320 817 299 596 465 764 624 434 541 314 494 77 194 187 688 754 491 387 473 521 433 691 287 774 112 269 638 461 47 369 580 233 471 349 305 464 347 149 8 136 105 568 92 310 518 678 54 96 828 259 154 192 467 410 440 583 537 22 334 419 265 806 353 108 463 460 370 647 395 248 303 757 199 597 20 285 793 335 751 28 720 36 52 803 150 174 750 479 270 646 205 591 644 650 83 520 134 771 183 472 745 808 805 604 373 452 51 126 87 529 375 65 260 763 377 337 692 726 321 476 186 780 217 775 114 466 776 769 32 573 94 402 504 228 225 268 830 43 812 345 478 182 693 291 531 346 423 524 610 700 307 256 424 603 514 202 600 333 785 380 46 176 49 195 622 428 725 359 103 220 585 630 698 561 161 317 143 55 706 798 523 44 120 601 696 224 11 63 160 350 748 427 587 418 663 196 361 652 527 10 599 731 744 247 655 19 148 475 546 132 490 277 85 363 101 608 18 50 794 35 727 59 454 675 685 379 820 540 209 715 669 526 703 623 356 765 684 690 729 212'
    ],
      output: [
    '9',
    '79',
    '91',
    '1406'
  ]
  },
  // Round 5: Fito
    {
      input: [
    '#------\\-------/-------\\-------/',
    '------\\-/-/------\\-----#-------\\--/----------------\\--\\----\\--------/---',
    '------\\-/-/------\\-----#-------\\--/----------------\\--\\----\\--------/--------------'
  ],
      output: [
    '/#------\\',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '\\-------/',
    '/---------\\',
    '|         |',
    '|       /-/',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '|       |',
    '\\----\\  \\-----#-------\\',
    '     |                |',
    '     |                |',
    '     \\----------------/',
    'ERROR'
  ]
  },
  // Round 6: Plot
    {
      'input': [],
      'output': []
  }
 ];

  // Now expose the API endpoints
  seminarjs.app.get('/contest/input', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    var token = req.query.token;

    getUserFromToken(token, function (user) {
      if (!user) {
        res.status(401).send('Error: Invalid token');
        return;
      } else {
        res.send(contestData[user.contest.round].input.join("\n"));
      }
    });
  });

  var textParser = bodyParser.text();

  seminarjs.app.post('/contest/output', textParser, function (req, res) {
    res.setHeader('Content-Type', 'text/plain');

    if (typeof req.body !== 'string' || !req.body || req.body.length < 1) return res.status(400).send('Error: No output received');

    var token = req.query.token;

    getUserFromToken(token, function (user) {
      if (!user) {
        res.status(401).send('Error: Invalid token');
        return;
      }

      // Make sure body is a string
      req.body += "";

      // Validate the output
      var output = req.body.split("\n"),
        total = contestData[user.contest.round].output.length,
        correct = 0;

      res.write('Welcome ' + user.name + "\n");
      res.write('Line	|	Status' + "\n");

      for (var i = 0; i < total; i++) {
        var line = i + '	|	',
          status = 'FAIL';
        if (typeof output[i] !== 'undefined' && output[i] == contestData[user.contest.round].output[i]) {
          correct++;
          status = 'OK';
        } else {
          console.log("[Verify] User=" + user.name + ', Round=' + user.contest.round + ', output=' + output[i]);
        }
        res.write(line + status + "\n");
      }

      res.write('--------------------------' + "\n");

      var passed = false,
        percentage = correct * 100 / total,
        status = 'FAIL';

      if (percentage == 100) {
        passed = true;
        status = 'OK';
      }

      res.write('STATUS ' + percentage + '% ' + status + "\n");

      if (percentage > user.contest.progress) {
        user.contest.progress = percentage;
        user.contest.date = Date.now();
      }

      if (passed) {
        //var token = Math.floor(Math.random() * 10000) + 100;

        //user.contest.token = token;
        user.contest.round = user.contest.round + 1;
        user.contest.progress = 0;

        res.write('New token: ' + user.contest.token);
      }

      user.save(function (err) {
        if (err) return handleError(err);

        res.end();
      });
    });

  });

  // --------------------------------------- //
  //          Internal functions             //
  // --------------------------------------- //

  /**
   * Return the user associated with a given token
   * @param  {String} token User token
   * @return {Object}       User data object
   */
  function getUserFromToken(token, callback) {

    User.findOne({
      'contest.token': token
    }, function (err, person) {
      if (err) {
        console.log('[ERROR] ' + err);
        callback(false);
      }
      callback(person);
    });
  }
}