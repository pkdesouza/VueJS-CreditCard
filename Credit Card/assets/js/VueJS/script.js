var app = new Vue({
	el:'#app',
	data: {
		Title : 'Cartão crédito',
		User : { 
			name : '',
			CVV : '',
			cardNumber : '',
			month: '',
			year: '',
			expirateDate : false
		},
		ClassList: { transparent : 'transparent' },
		TypeCart: { amex : 'amex', visa : 'visa', mastercard : 'mastercard' },
		months : [],
		years : [],
		Selector : { 
		 	visa : '#visa',
    		amex : '#amex',
    		mastercard : '#mastercard',
    		cardNumberField : '#card-number-field',
    		cardNumber : '#cardNumber',
		    CVV : '#cvv'
    	},
    	CardImage :{ visa : 'assets/images/visa.jpg' , mastercard : 'assets/images/mastercard.png' , amex : 'assets/images/amex.jpg'},
    	CardUrl : ''
	},
	filters : {
		NameCart: function(str,length){
			return (str.substring(0,length)).toUpperCase();
		}
	},
	computed:{
		//User(){
		//	this.User.expirateDate = (this.User.month != '' && this.User.year != '');
		//}
	},
	watch: {

	},
	methods:{
		Init : function() {
		    this.JQ(this.Selector.cardNumber).payform('formatCardNumber');
		    this.JQ(this.Selector.CVV).payform('formatCardCVC');

		    var year = (new Date()).getFullYear();
		    this.years.push( { value : year } );
		    for (var i = 1; i <= 12; i++) {
		    	this.months.push( { value : ("0"+i).slice(-2) } );
		    	if(i <= 6)
		    		this.years.push( { value : year + i} );
		    }
		},
		JQ : function(elem){
			return $(elem);
		},
		CardNumberEvent: function(){
			this.JQ(this.Selector.visa).removeClass(this.ClassList.transparent);
	        this.JQ(this.Selector.amex).removeClass(this.ClassList.transparent);
	        this.JQ(this.Selector.mastercard).removeClass(this.ClassList.transparent);

	        this.cardNumberValidation();
		},
		cardNumberValidation : function(){
			if (!$.payform.validateCardNumber(this.User.cardNumber)) {
            	this.JQ(this.Selector.cardNumberField).addClass('has-error');
        	} else {
            	this.JQ(this.Selector.cardNumberField).removeClass('has-error');
            	this.JQ(this.Selector.cardNumberField).addClass('has-success');
        	}

        	if ($.payform.parseCardType(this.User.cardNumber) == this.TypeCart.visa) {
	            this.JQ(this.Selector.mastercard).addClass(this.ClassList.transparent);
	            this.JQ(this.Selector.amex).addClass(this.ClassList.transparent);
	            this.CardUrl = this.CardImage.visa;
	        } else if ($.payform.parseCardType(this.User.cardNumber) == this.TypeCart.amex) {
	            this.JQ(this.Selector.mastercard).addClass(this.ClassList.transparent);
	            this.JQ(this.Selector.visa).addClass(this.ClassList.transparent);
	            this.CardUrl = this.CardImage.amex;
	        } else if ($.payform.parseCardType(this.User.cardNumber) == this.TypeCart.mastercard) {
	            this.JQ(this.Selector.amex).addClass(this.ClassList.transparent);
	            this.JQ(this.Selector.visa).addClass(this.ClassList.transparent);
	            this.CardUrl = this.CardImage.mastercard;
	        }
		},
		ConfirmPurchase : function(e){
			
			var isCardValid = $.payform.validateCardNumber(this.User.cardNumber);
        	var isCvvValid = $.payform.validateCardCVC(this.User.CVV);


	        if(this.User.name.length < 5){
	            alert("Nome inválido");
	        } else if (!isCardValid) {
	            alert("Cartão com número inválido");
	        } else if (!isCvvValid) {
	            alert("CVV inválido");
	        } else {
	            alert("Tudo funcionando");
	        }
		}
	}
});

app.Init();
