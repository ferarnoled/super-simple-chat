(function() {

    var output = $('#output'),
        input = $('#input'),
        sChannel = $('#topicList'),
        button = $('#button'),
        avatar = $('#avatar'),
        presence = $('#presence'),
        btnAddTopic = $('#btnAddTopic'),
        btnSetUserName = $('#btnSetUserName'),
        userName = null;

    // Assign a random avatar in random color
    avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

    var p = new PubNub({
        subscribe_key: 'sub-c-c915c432-820a-11e7-b8ba-72cd244bcd80',
        publish_key:   'pub-c-59d80b78-2ea9-423f-94df-01319b39de2c'
    });

    p.subscribe({
        channels: ["default", "customTopic"]
    });

    p.hereNow(
      {
        channels: ["default", "customTopic"],
        includeUUIDs: true,
        includeState: true
      },
      function (status, response) {
        console.log('Here now status: ' + JSON.stringify(status, null, 4));
        console.log('Here now response: ' + JSON.stringify(response, null, 4));
      }
    );

    p.addListener({
        status: function(statusEvent) {
          if (statusEvent.category === "PNConnectedCategory") {
            console.log(statusEvent);
          }
        },
        message: function(m) {
          console.log("New Message!!", m);
          var htmlString = '<p><i class="' + m.message.avatar + '"></i><span>' +  m.message.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.html();
          output.html( htmlString );
        },
        presence: function(m){
            if(m.occupancy > 1) {
              presence.textContent = m.occupancy + ' people online';
            } else {
              presence.textContent = 'Nobody else is online';
            }
        }
    });

    input.bind('keyup', function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    button.bind('click', publish);
    btnAddTopic.bind('click', addTopic);
    btnSetUserName.bind('click', setUserName);

    function publish() {
        p.publish({
            channel : sChannel.val(),
            message : {text: input.val(), avatar: avatar.className, userName: userName}
        },
        function (status, response) {
          if (status.error) {
            // handle error
            console.log(status)
          } else {
            console.log("message Published w/ timetoken", response.timetoken)
          }
        });
    }

    function addTopic() {
      if ($('#txtNewTopic').val() && $('#txtNewTopic').val() !== '') {
        p.subscribe({
          channels: [$('#txtNewTopic').val()]
        });
        $('#topicList').append($('<option>', {
          value: $('#txtNewTopic').val(),
          text: $('#txtNewTopic').val()
        }));
      }
    }

    function setUserName() {
      let userName = $('#txtUserName').val();
      $('#pUserName').html('User: ' + userName);
      $('#main').show();
    }

})();