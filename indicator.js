/*
Modal Indicator View - ©BSoft&Co 2012
-------------------------------------
v1.01
===============================================================================
Ti.App.fireEvent('show_indicator',{message:L('saving'),loader:true/false});
Ti.App.fireEvent('newMess_indicator',{message:L('message')});
Ti.App.fireEvent('hide_indicator');
===============================================================================
*/

// ============================================================================
function Indicator() {
    var indWin = null;
    var actInd = null;
    var _withLoader = true;

    this.showIndicator = function(messageTxt,withLoader) {
        _withLoader = withLoader;

        // window container
        indWin = Titanium.UI.createWindow({
            height:'100%',
            width:'100%'
        });

        // black view
        var indView = Titanium.UI.createView({
            height:170,
            width:170,
            backgroundColor:'#000',
            borderRadius:10,
            opacity:0.8
        });
        indWin.add(indView);

        if (_withLoader) {
            // loading indicator
            actInd = Titanium.UI.createActivityIndicator({
                style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
                height:40,
                width:40,
                top:30
            });
            indView.add(actInd);
        }
                
        // message
        var message = Titanium.UI.createLabel({
            text:messageTxt,
            color:'#fff',
            width:'auto',
            height:'auto',
            font:{fontSize:18,fontWeight:'bold',fontFamily:'Chalkboard'},
            top:75,
            textAlign:'center'
        });

        indView.add(message);
        indWin.open();
        if (_withLoader) {
            actInd.show();
        } else {
            message.top = 20;    
        }    
    }

    this.hideIndicator = function() {
        if (_withLoader) { 
            actInd.hide();
        }    
        indWin.close({opacity:0,duration:500}, function() {
            indWin = null;
        });
    }

    this.changeMessage = function(newMess) {
        if (_withLoader) { 
            indWin.children[0].children[1].text = newMess;
        } else {
            indWin.children[0].children[0].text = newMess;
        }
    }        
}
// ============================================================================

// ============================================================================
//
// Add global event handlers to hide/show custom indicator
//
var instIndi;
Titanium.App.addEventListener('show_indicator', function(e) {
	Ti.API.info("IN SHOW INDICATOR");
    var mess = L('Loading')+'...';
    var showLoader = true;
    if (e.message != null) { mess = e.message;}
    if (e.loader != null) { showLoader = e.loader;}
    instIndi = new Indicator();
	instIndi.showIndicator(mess,showLoader);
});
Titanium.App.addEventListener('hide_indicator', function(e) {
	Ti.API.info("IN HIDE INDICATOR");
	instIndi.hideIndicator();
    instIndi = null;
});
Titanium.App.addEventListener('newMess_indicator', function(e) {
    Ti.API.info("IN CHANGE INDICATOR MESS");
    instIndi.changeMessage(e.message);
});
// ============================================================================