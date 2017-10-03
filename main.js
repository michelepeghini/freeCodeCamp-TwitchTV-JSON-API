//module pattern for twitch object
var twitch = (function() {
  var base = "https://wind-bow.glitch.me/twitch-api/"; // workaround API endpoint
  var streams = "streams/"; // /<channel name> Gets stream information (the stream object) for a specified user.
  var channels = "channels/"; // /<channel name> Gets channel information (the channel object) for a specified user.
  var callback = "?callback=?"; // JSONP response
  function buildRequest(type, data) {
    return base + type + data + callback; //return URL encoded API call string depending on params passed
  }
  return {
    channelList:  ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"],
    getStreams: function(streamName) {
      $.getJSON(buildRequest(streams, streamName), function(data) {
        if (data.stream) {
          $('#'+data.stream.channel._id+' .stream_led').addClass('live');
          $('#streams').trigger('streamData', [data.stream]);
          $('#streams .panel_err').remove();
        }
        return;
      })
    },
    getChannels: function(channelName) {
      $.getJSON(buildRequest(channels, channelName), function(data) {
        (data.hasOwnProperty('error'))
          ? $('#channels').trigger('channelErr', [data])
          : $('#channels').trigger('channelData', [data]);
        return;
      })
    }    
  }
})();

var listOfChannels = []; // list of channel objects
var listOfStreams = []; // list of stream objects      
      
// create individual channel element to append in the panel
function buildChannel(channel) {  
  var chanEl = $('<div class="panel_el row" id="'+channel._id+'" />');
    chanEl.addClass('panel_el_link');
    var chanLink = $('<a href="https://www.twitch.tv/'+channel.name+'" target="_blank" />');
      // Image
      var chanStripImg = $('<div class="col-xs-12 col-sm-3" />');
        var logo = channel.logo
          ? '<img src="'+ channel.logo +'" alt="'+channel.name+'" title="'+channel.name+'" class="img img-responsive logo">'
        :'';
        chanStripImg.html(logo);
      chanLink.append(chanStripImg);
      // Title
      var chanStripTitle = $('<div class="col-xs-12 col-sm-6" />');
        chanStripTitle.html('<h3 >'+channel.display_name+'<span class="stream_led"></h3>');
      chanLink.append(chanStripTitle);
      var chanStripFollowers = $('<div class="col-xs-12 col-sm-3" />');
        chanStripFollowers.html('<p class="followers"><span class="glyphicon glyphicon-user"></span>'+channel.followers+'</p>');
      chanLink.append(chanStripFollowers);
  return chanEl.append(chanLink);
}

// create individual channel element to append in the panel
function buildStream(stream) {
  
  var streamEl = $('<div class="panel_el row" id="'+stream._id+'">');
    var streamLink = $('<a href="https://www.twitch.tv/'+stream.channel.name+'" target="_blank">');
      // Image
      var streamStripImg = $('<div class="col-xs-12 col-sm-3">');
        streamStripImg.html('<img src="'+stream.preview.small+'" alt="'+stream.game+'" class="img img-responsive stream_prv">');
      streamLink.append(streamStripImg);
      // Title
      var streamStripTitle = $('<div class="col-xs-12 col-sm-6">');
        streamStripTitle.append('<h3>'+stream.game+'</h3>');
      streamLink.append(streamStripTitle);
      // Viewers
      var streamStripViewers = $('<div class="col-xs-12 col-sm-3">');
        streamStripViewers.html('<p class="viewers"><span class="glyphicon glyphicon-eye-open"></span>'+stream.viewers+'</p>');
      streamLink.append(streamStripViewers);
  return streamEl.append(streamLink);  
}

// create individual error element to append in the panel
function buildErr(message) {  
  var chanEl = $('<div class="panel_el text-center panel_err" />');
  return chanEl.html('<h3 class="name">'+message+'</h3>');
}
      
$(document).ready(function() {
  //event for creating a channel DOM element after successfull API call
  $('#channels').on('channelData', function(evt, data) {
    listOfChannels.push(data);//store data in array
    twitch.getStreams(data.name);// look for live streams
    $('#channels').append(buildChannel(data)); // build html element and append it in channel tab
  })
  
  //event for creating a channel DOM element after UNsuccessfull API call
  $('#channels').on('channelErr', function(evt, err) {
      $('#channels').append(buildErr(err.message));  
  })
  
  //event for creating a stream DOM element after successfull API call
  $('#streams').on('streamData', function(evt, data) {
    listOfStreams.push(data); //store data in array
    $('#streams').append(buildStream(data)); // build html element and append it in streams tab
  })
  
  //event for switching view between tabs
  $('.nav-tabs li').on('click', function(evt) {
    //link ID of tab headers to ID of tabs
    var tabLinks = {
      channels_tab: '#channels',
      streams_tab: '#streams'
    }
    // set active tab and toggle views
    if(!$(evt.target).hasClass('active')) {
      $('.active').removeClass('active');
      $(evt.target).addClass('active');
      var triggerId = $(evt.target).attr('id');
      $.each(tabLinks, function(k, v) {
        (k === triggerId) ? $(v).show() : $(v).hide();
      })
    }
  })
  
  $('#streams').hide(); //hide streams tab
  $('#streams').append(buildErr('No live streams available.')); // default stream tab content
  twitch.channelList.forEach(function(c){
    twitch.getChannels(c);  
  })  
})