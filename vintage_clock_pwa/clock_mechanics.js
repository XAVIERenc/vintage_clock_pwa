/* All Javascript written by Jeffrey B. Madden 2021. */

(function() {
var Clock = function( element ) {
   this.element = document.getElementById(element) ;
   this.init() ;
   } ;

Clock.prototype.init = function() {
   var self = this ;

   /* Properties */
   this.title = "+ Vintage Time +" ;
   this.creator_link = "https://www.linkedin.com/in/jeffrey-madden" ;
   this.creator_image = "vintage_clock_pwa/images/logo_jeff_02.png" ;
   this.timer = undefined ;
   this.speed = 1000 ; /* Interval Speed */
   this.transition_speed = 1 ; /* Seconds */
   this.hand_wrap = undefined ;
   this.short_hand = undefined ;
   this.long_hand = undefined ;

   this.time = {
      day : undefined ,
      hour : undefined ,
      minutes : undefined ,
      seconds : undefined
      } ;

   this.shadow = {
      short_hand : undefined ,
      long_hand : undefined ,
      height : 0.7 , /* long hand height affects styles to simulate height difference from short hand */
      offset_x : 1.2 , /* -1 = left, +1 = right, 0 = center */
      offset_y : 1.2 , /* -1 = up, +1 = down, 0 = center */
      opacity : 0.7 ,
      blur : 3
      } ;

   /* Setup */
   this.initializing = true ;
   this.setupTitle(self) ;
   this.setupHands(self) ;
   this.setupCreator(self) ;
   this.setTime(self) ;
   this.startTime(self) ;
   this.initializing = false ;
   } ;

/* Setup Functions */

Clock.prototype.setupTitle = function( self ) {
   var title = self._ele("div") ;
   self._atta(title , "class" , "head title") ;
   var span = self._ele("span") ;
   self._txt(span , self.title) ;
   title.appendChild(span) ;
   self.element.appendChild(title) ;
   } ;

Clock.prototype.setupHands = function( self ) {
   self.hand_wrap = self._ele("div") ;
   self._atta(self.hand_wrap , "class" , "hand_wrap") ;

   self.short_hand = self._ele("div") ;
   self._atta(self.short_hand , "class" , "hand short") ;
   self.long_hand = self._ele("div") ;
   self._atta(self.long_hand , "class" , "hand long") ;

   self.shadow.short_hand = self._ele("div") ;
   self._atta(self.shadow.short_hand , "class" , "shadow short") ;
   self.shadow.long_hand = self._ele("div") ;
   self._atta(self.shadow.long_hand , "class" , "shadow long") ;

   self.hand_wrap.appendChild(self.short_hand) ;
   self.hand_wrap.appendChild(self.long_hand) ;
   self.hand_wrap.appendChild(self.shadow.short_hand) ;
   self.hand_wrap.appendChild(self.shadow.long_hand) ;
   self.element.appendChild(self.hand_wrap) ;

   self._addTransition(self , self.short_hand , false) ;
   self._addTransition(self , self.long_hand , false) ;
   self.setShadowStyles(self) ;
   } ;

Clock.prototype.setShadowStyles = function( self ) {
   self.shadow.short_hand.style.left = self.shadow.offset_x + "%" ;
   self.shadow.short_hand.style.top = self.shadow.offset_y + "%" ;
   self.shadow.short_hand.style.opacity = self.shadow.opacity + "" ;
   self.shadow.short_hand.style.filter = "blur(" + self.shadow.blur + "px)" ;
   self.shadow.short_hand.style.webkitFilter = "blur(" + self.shadow.blur + "px)" ;
   self.shadow.short_hand.style.mozFilter = "blur(" + self.shadow.blur + "px)" ;

   if ( self.shadow.offset_x < 0 ) { var height_x = self.shadow.height * -1 ; }
   else { var height_x = self.shadow.height ; }
   if ( self.shadow.offset_y < 0 ) { var height_y = self.shadow.height * -1 ; }
   else { var height_y = self.shadow.height ; }
   self.shadow.long_hand.style.left = (self.shadow.offset_x + height_x) + "%" ;
   self.shadow.long_hand.style.top = (self.shadow.offset_y + height_y) + "%" ;
   self.shadow.long_hand.style.opacity = (self.shadow.opacity - (self.shadow.height / 20)) + "" ;
   self.shadow.long_hand.style.filter =  "blur(" + (self.shadow.blur + (self.shadow.height / 2)) + "px)" ;
   self.shadow.long_hand.style.webkitFilter = "blur(" + (self.shadow.blur + (self.shadow.height / 2)) + "px)" ;
   self.shadow.long_hand.style.mozFilter = "blur(" + (self.shadow.blur + (self.shadow.height / 2)) + "px)" ;
   self._addTransition(self , self.shadow.short_hand , false) ;
   self._addTransition(self , self.shadow.long_hand , false) ;
   } ;

Clock.prototype.setupCreator = function( self ) {
   var creator = self._ele("div") ;
      self._atta(creator , "class" , "head creator") ;
      var span = self._ele("span") ;
      self._txt(span , "Created by") ;
      var a = self._ele("a") ;
      self._atta(a , "href" , self.creator_link) ;
      self._atta(a , "target" , "_blank") ;
         var img = self._ele("img") ;
         self._atta(img , "src" , self.creator_image) ;
         self._atta(img , "alt" , "Jeff Madden") ;

   creator.appendChild(span) ;
   a.appendChild(img) ;
   creator.appendChild(a) ;
   self.element.appendChild(creator) ;
   } ;

/* Actions */

Clock.prototype.setTime = function( self ) {
   var d = new Date() ;
   self.time.day = d.getDay() ;
   self.time.hour = d.getHours() ;
   if ( self.time.hour > 12 ) { self.time.hour -= 12 ; }
   self.time.minutes = d.getMinutes() ;
   self.time.seconds = d.getSeconds() ;

   if ( (self.time.minutes === 0) && (self.time.seconds === 0) && (!self.initializing) )
      {
      self.pauseTime(self) ;
      if ( self.time.hour >= 12 ) { self.lastRotate(self , self.short_hand , self.shadow.short_hand , 1000) ; }
      self.lastRotate(self , self.long_hand , self.shadow.long_hand , 2000) ;
      setTimeout( function() { self.startTime(self) ; } , 3000 ) ;
      }
   else { self.setHour(self) ; self.setMinutes(self) ; }
   } ;

Clock.prototype.setHour = function( self ) {
   var h = self.time.hour * 30 ;
   var d = self.time.minutes / 2 ;
   self._adjustTransform(self.short_hand , h + d) ;
   self._adjustTransform(self.shadow.short_hand , h + d) ;
   } ;

Clock.prototype.setMinutes = function( self ) {
   var d = self.time.minutes * 6 ;
   self._adjustTransform(self.long_hand , d) ;
   self._adjustTransform(self.shadow.long_hand , d) ;
   } ;

Clock.prototype.startTime = function( self ) {
   self.timer = setInterval( function() { self.setTime(self) ; } , self.speed ) ;
   } ;

Clock.prototype.pauseTime = function( self ) {
   clearInterval(self.timer) ;
   } ;

Clock.prototype.lastRotate = function( self , tar , shadow , x ) {
   var d = 360 ;
   self._adjustTransform(tar , d) ;
   self._adjustTransform(shadow , d) ;
   self.resetHand(self , tar , x) ;
   self.resetHand(self , shadow , x + 200) ;
   } ;

Clock.prototype.resetHand = function( self , tar , x ) {
   setTimeout( function() {
      self._adjustTransition(self , tar , true) ;
      self._adjustTransform(tar , 0) ;
      self._addTransition(self , tar , true) ;
      } , x ) ;
   } ;

/* Private Functions */

Clock.prototype._addTransition = function( self , tar , timeout ) {
   if ( timeout ) { setTimeout( function() { self._adjustTransition(self , tar) ; } , 400 ) ; }
   else { self._adjustTransition(self , tar) ; }
   } ;

Clock.prototype._adjustTransform = function( tar , val ) {
   val = "rotate(" + val + "deg)" ;
   tar.style.transform = val ;
   tar.style.webkitTransform = val ;
   tar.style.mozTransform = val ;
   } ;

Clock.prototype._adjustTransition = function( self , tar , none ) {
   if ( none )
      {
      var val = "none" ;
      tar.style.transition = val ;
      tar.style.webkitTransition = val ;
      tar.style.mozTransition = val ;
      }
   else
      {
      var val = "transform " + self.transition_speed + "s linear" ;
      tar.style.transition = val ;
      tar.style.webkitTransition = "-webkit-" + val ;
      tar.style.mozTransition = "-moz-" + val ;
      }
   } ;

Clock.prototype._ele = function( e ) { var ta = document.createElement(e) ; return ta ; } ;
Clock.prototype._txt = function( t , v ) { var a = document.createTextNode(v) ; t.appendChild(a) ; } ;
Clock.prototype._atta = function( t , att , v ) { var a = document.createAttribute(att) ; a.value = v ; t.setAttributeNode(a) ; } ;

(function() {
   var clock = new Clock("clock") ;
   })() ;
})() ;