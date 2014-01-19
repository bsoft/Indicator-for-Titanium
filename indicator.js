/*
Modal Indicator View - ©BSoft&Co 2012
-------------------------------------
v1.04.3
===============================================================================
Ti.App.fireEvent('show_indicator',{nameid:'objectName',message:L('saving'),loader:true/false, 'fontSize':15});
Ti.App.fireEvent('newMess_indicator',{nameid:'objectName',message:L('message')});
Ti.App.fireEvent('hide_indicator',{nameid:'objectName'});
===============================================================================
*/

// ============================================================================
function Indicator() {
    var indWin = null, actInd = null, _withLoader = true;

    this.showIndicator = function(messageTxt, withLoader, fontSize) {
        _withLoader = withLoader;

        // window container
        indWin = Titanium.UI.createWindow({
            height:'100%',
            width:'100%',
            zIndex: 10000,
            opacity:0.1
        });

        // opaque view container
        var indView = Titanium.UI.createView({
            height:170,
            width:170,
            backgroundColor:'#000',
            borderRadius:10,
            opacity:0.8
        });
        indWin.add(indView);

        // message
        var message = Titanium.UI.createLabel({
            text:messageTxt,
            color:'#fff',
            width:Ti.UI.SIZE || 'auto',
            height:Ti.UI.SIZE || 'auto',
            font:{'fontSize':fontSize,'fontWeight':'bold',fontFamily:'AvenirNext-DemiBoldItalic'},
            top:70,
            textAlign:'center'
        });
        indView.add(message);

        if (_withLoader) {
            // loading indicator
            actInd = Titanium.UI.createActivityIndicator({
                style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
                height:40,
                width:40,
                top:25
            });
            indView.add(actInd);
        }

        indWin.open({opacity:1,duration:500});
        if (_withLoader) {
            actInd.show();
        } else {
            message.top = 25;    
        }    
    };

    this.hideIndicator = function() {
        if (_withLoader) { 
            actInd.hide();
            actInd = null;
        }    
        setTimeout(function () {
            try {
                indWin.close();    
            }
            catch (e) {}
        }, 1000);
        indWin.close({opacity:0,duration:750}, function() {
            indWin = null;
        });
    };

    this.changeMessage = function(newMess) {
        indWin.children[0].children[0].text = newMess;
    };        
};
// ============================================================================

// ============================================================================
//
// Add global event handlers to hide/show custom indicator
//
var instIndi = [];
Titanium.App.addEventListener('show_indicator', function(e) {
    Ti.API.info("IN SHOW INDICATOR");
    var mess = L('Loading')+'...';
    var showLoader = true;
    var fontSize = 16;
    if (e.message != null) { mess = e.message;}
    if (e.loader != null) { showLoader = e.loader;}
    if (e.fontSize != null) { fontSize = e.fontSize;}
    instIndi[e.nameid] = new Indicator();
    instIndi[e.nameid].showIndicator(mess,showLoader,fontSize);
});
Titanium.App.addEventListener('hide_indicator', function(e) {
    Ti.API.info("IN HIDE INDICATOR");
    instIndi[e.nameid].hideIndicator();
    instIndi[e.nameid] = null;
});
Titanium.App.addEventListener('newMess_indicator', function(e) {
    Ti.API.info("IN CHANGE INDICATOR MESS");
    instIndi[e.nameid].changeMessage(e.message);
});
// ============================================================================