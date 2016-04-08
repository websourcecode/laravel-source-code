<!DOCTYPE html>
<!-- This site was created in Webflow. http://www.webflow.com-->
<!-- Last Published: Tue Nov 24 2015 13:48:30 GMT+0000 (UTC) -->
<html data-wf-site="55ddf3cd589f44b96aee07cd" data-wf-page="55e975604dc34588755268ae">
<head>




    <meta charset="utf-8">

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

    <title>Build a Bubble Board</title>
    <meta name="description" content="Build a bubble board for employee customer feedback.">
    <meta name="keywords" content="Feedback Idea Strategy Communication Discussion Private Anonymous Employee Customer">
    <meta property="og:title" content="Bubble Board I have gone and used">
    <meta property="og:description" content="What ever the hell bubble board is I have done something with it and I semi-regret it at this point">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="Bubble Board I have gone and used">
    <meta property="og:description" content="A discussion platform hidden behind a pin code for feedback, idea's and strategy discussion. Employees or customers can post and interact anonymously to maximise honesty.">
    <meta name="generator" content="Webflow">
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/webflow.css">
    <link rel="stylesheet" type="text/css" href="css/bubbl-board-beta.webflow.css">
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
    <script>
        WebFont.load({
            google: {
                families: ["Exo:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Roboto:300,regular","Roboto Condensed:regular","Amaranth:regular,italic,700"]
            }
        });
    </script>
    <script type="text/javascript" src="js/modernizr.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="images/BB favicon.png">
    <link rel="apple-touch-icon" href="images/webclip_1.png">
</head>
<body>
<div class="w-section">
    <div class="w-section navbar">
        <div class="w-container">
            <div class="w-row containersss">
                <div class="w-col w-col-4 w-col-small-6 w-col-tiny-6 left-nav">
                    <a href="/" class="w-inline-block"><img width="264" src="images/bboard logo v1 white.png" class="logo">
                    </a>
                </div>
                <div class="w-col w-col-8 w-col-small-6 w-col-tiny-6 w-clearfix right-nav">
                    <div class="w-hidden-medium w-hidden-small w-hidden-tiny in3min">In 3 mins for free!</div>
                    <div data-collapse="medium" data-animation="default" data-duration="400" data-contain="1" class="w-nav nav-bar">
                        <div class="w-container navbar2">
                            <nav role="navigation" class="w-nav-menu"><a href="/" target="_blank" class="w-nav-link link">How?</a><a href="about.html" class="w-nav-link link">Info</a><a href="#" data-ix="loginpopup" class="w-nav-link loginlinkpop">Join</a><a href="buildabubble.html" class="w-nav-link link">Build a Board!</a>
                            </nav>
                            <div class="w-nav-button menubutton">
                                <div class="w-icon-nav-menu menu-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-hidden-tiny just-do-it">Alpha (but omg it's going to be good)</div>
    </div>
</div>
<div class="w-section">
    <div class="w-section section hero success">
        <div class="w-container container">
            <h1>Build a Bubble Board</h1>
            <p>(It's so easy)</p>
        </div>
    </div>
</div>
<div class="w-section">
    <div class="w-container asdasd">
        <div class="w-form">
            {!! Form::open( ['url'=>'build/']) !!}
            <div class="w-clearfix form-mid{{$errors->has('boardname')?'red has-error':''}}">
                <div class="subtitle">Hey {{ auth()->user()->name }}, lets make a Bubble Board!</div>
                <div class="boardname">Board name:</div>
                <div data-ix="hovername" class="hoverinfo">?</div>
                <div data-ix="namehoverinitial" class="namehover">This is the name of the bubble board</div>
                <input id="boardname" type="text" placeholder="Enter your board name" name="boardname" data-name="Boardname 2" class="w-input board-name">
                {!! $errors->first('boardname','<span class="help-block">:message</span>') !!}

                <div class="boardname">Board blurb:</div>
                <div data-ix="blurbhover" class="hoverinfo">?</div>
                <div data-ix="intial-hide" class="boardnamehover">A description of the board for the users&nbsp;</div>
                <input id="board-5" type="text" placeholder="Enter the board purpose" name="boardblurb" data-name="Board 5" class="w-input board-name">

                <div class="subtitle">Decide how people enter your board:</div>


                <div class="w-row">
                    <div class="w-col w-col-6">
                        <div class="w-checkbox checkboxfield">
                            <input id="PincodeCheckbox" type="checkbox" name="Email-10" data-name="Email 10" class="w-checkbox-input checkbox" checked>
                            <label for="Email-10" class="w-form-label checkboxtext">Pincode</label>
                            <div class="reveal-if-active">
                                <label class="boardname" for="board-6">Set your boards pincode:</label>

                                <input id="board-6" data-require-pair="#PincodeCheckbox" type="text" placeholder="Enter a pin or get a random one" name="pincode" data-name="Board 6" class="require-if-active w-input board-name{{$errors->has('boardname')?'red has-error':''}}">
                                {!! $errors->first('pincode','<span class="help-block">:message</span>') !!}
                                <!--<a href="#" class="w-button pingenerate">Randomly Generate Pin&nbsp;</a>-->
                            </div>
                        </div>
                    </div>
                    <div class="w-col w-col-6">
                        <div class="w-checkbox checkboxfield">
                            <input id="Email-11" type="checkbox" name="Email-11" data-name="Email 11" class="w-checkbox-input checkbox">
                            <label for="Email-11" class="w-form-label checkboxtext greyedout">Email Domain</label>
                            <div class="reveal-if-active">
                                <label for="which-dog">Sorry this isn't available yet :(</label>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-row">
                    <div class="w-col w-col-4">
                        <div class="w-checkbox checkboxfield">
                            <input id="Email-16" type="checkbox" name="Email-16" data-name="Email 16" class="w-checkbox-input checkbox">
                            <label for="Email-16" class="w-form-label checkboxtext greyedout">Active directory Sync</label>
                            <div class="reveal-if-active">
                                <label for="which-dog">Sorry this isn't available yet :(</label>

                            </div>
                        </div>
                    </div>
                    <div class="w-col w-col-4">
                        <div class="w-checkbox checkboxfield">
                            <input id="Email-14" type="checkbox" name="Email-14" data-name="Email 14" class="w-checkbox-input checkbox">
                            <label for="Email-14" class="w-form-label checkboxtext greyedout">Timed Pincodes</label>
                            <div class="reveal-if-active">
                                <label for="which-dog">Sorry this isn't available yet :(</label>

                            </div>
                        </div>
                    </div>
                    <div class="w-col w-col-4">
                        <div class="w-checkbox checkboxfield">
                            <input id="Email-15" type="checkbox" name="Email-15" data-name="Email 15" class="w-checkbox-input checkbox">
                            <label for="Email-15" class="w-form-label checkboxtext greyedout">GPS Location</label>
                            <div class="reveal-if-active">
                                <label for="which-dog">Sorry this isn't available yet :(</label>

                            </div>
                        </div>
                    </div>
                </div>


                <!-- <div class="subtitle">Use a pin code for people to enter:</div><a href="#" class="w-button pingenerate">Randomly Generate Pin&nbsp;</a>
                <input id="board-6" type="text" placeholder="Enter a pin or get a random one" name="pincode" data-name="Board 6" class="w-input board-name{{$errors->has('boardname')?'red has-error':''}}">
                {!! $errors->first('pincode','<span class="help-block">:message</span>') !!}
                <div> -->
                    <div class="subtitle">Board admin alias (automatically you!):</div>
                    <input id="adminbx" type="text" value="{{ auth()->user()->name }}" name="admin" data-name="Board 7" class="w-input board-name">
                </div>
                <input type="submit" value="Generate Your Bubble Board!" data-wait="Please wait..." class="w-button generateboard">
            {!! Form::close() !!}
            </div>

        </div>
    </div>
    <div class="w-container contosinerf"></div>
</div>
<div class="w-container">
    <div class="blurbtext">It's that easy! Check out some of our <a class="basiclink" href="about.html">advance features</a> coming soon.</div>
</div>
<div class="w-section section grey">
    <div class="w-container">
        <div class="w-row">
            <div class="w-col w-col-4">
                <div class="w-widget w-widget-twitter">
                    <iframe src="https://platform.twitter.com/widgets/follow_button.html#screen_name=bubbleboardyes&amp;show_count=true&amp;size=m&amp;show_screen_name=true&amp;dnt=true" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 100%; height: 20px;"></iframe>
                </div>
                <div class="w-widget w-widget-facebook">
                    <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FBubbleboard%2F&amp;layout=button_count&amp;locale=en_US&amp;action=like&amp;show_faces=false&amp;share=false" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 90px; height: 20px;"></iframe>
                </div>
                <div class="w-widget w-widget-twitter">
                    <iframe src="https://platform.twitter.com/widgets/tweet_button.html#url=http%3A%2F%2Fbubbleboard.co.uk&amp;counturl=bubbleboard.co.uk&amp;text=This%20looks%20a%20touch%20awesome&amp;count=horizontal&amp;size=m&amp;dnt=true" scrolling="no" frameborder="0" allowtransparency="true" style="border: none; overflow: hidden; width: 110px; height: 20px;"></iframe>
                </div>
            </div>
            <div class="w-col w-col-4 footer-central-colum">
                <div class="footerh1">This is the site footer</div><a href="about.html" class="footerlink">About - Find out about bubble board</a><a href="#" class="footerlink">Login - login into your board</a><a href="buildabubble.html" class="footerlink">Build a bubble board</a>
                <div class="footerh1">Everything here is copyrighted etc etc.&nbsp;</div>
            </div>
            <div class="w-col w-col-4"><img width="65" src="images/webclip.png">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="js/webflow.js"></script>
<!--[if lte IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script><![endif]-->


<!--scipt for checkboxreveal-->
<script>
    var FormStuff = {

        init: function() {
            // kick it off once, in case the radio is already checked when the page loads
            this.applyConditionalRequired();
            this.bindUIActions();
        },

        bindUIActions: function() {
            // when a radio or checkbox changes value, click or otherwise
            $("input[type='radio'], input[type='checkbox']").on("change", this.applyConditionalRequired);
        },

        applyConditionalRequired: function() {
            // find each input that may be hidden or not
            $(".require-if-active").each(function() {
                var el = $(this);
                // find the pairing radio or checkbox
                if ($(el.data("require-pair")).is(":checked")) {
                    // if its checked, the field should be required
                    el.prop("required", true);
                } else {
                    // otherwise it should not
                    el.prop("required", false);
                }
            });
        }

    };

    FormStuff.init();
</script>


</body>
</html>