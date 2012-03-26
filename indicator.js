// Modal Indicator View
// v1.0
// ============================================================================
// Ti.App.fireEvent('show_indicator',{message:L('saving'),loader:true/false});
// Ti.App.fireEvent('newMess_indicator',{message:L('message')});
// Ti.App.fireEvent('hide_indicator');
// ============================================================================

// ============================================================================
function Indicator() {
    this.indWin = null;
    this.actInd = null;
    this._withLoader = true;

    this.showIndicator = function(messageTxt,withLoader) {
        this._withLoader = withLoader;

        // window container
        this.indWin = Titanium.UI.createWindow({
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
        this.indWin.add(indView);

        if (this._withLoader) {
            // loading indicator
            this.actInd = Titanium.UI.createActivityIndicator({
                style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
                height:40,
                width:40,
                top:30
            });
            indView.add(this.actInd);
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
        this.indWin.open();
        if (this._withLoader) {
            this.actInd.show();
        } else {
            message.top = 20;    
        }    
    }

    this.hideIndicator = function() {
        if (this._withLoader) { 
            this.actInd.hide();
        }    
        this.indWin.close({opacity:0,duration:500}, function() {
            this.indWin = null;
        });
    }

    this.changeMessage = function(newMess) {
        if (this._withLoader) { 
            this.indWin.children[0].children[1].text = newMess;
        } else {
            this.indWin.children[0].children[0].text = newMess;
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
});
Titanium.App.addEventListener('newMess_indicator', function(e) {
    Ti.API.info("IN CHANGE INDICATOR MESS");
    instIndi.changeMessage(e.message);
});
// ============================================================================