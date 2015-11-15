var Time = function(initVal)
{
	//atributos privados
	var
		segundo = 1000,
		minuto = 60 * segundo,
		hora = 60 * minuto,
		dia = 24 * hora;
		
	//atributos públicos
	this.timestamp = 0;
	this.value = "00:00:00:000";

	//métodos públicos
	this.init = function(val){
		if (typeof val == 'string'){
			this.setTime(val);
		} else {
			this.setVal(val);
		}
	}
	
	this.setVal = function(v){
		if (isNaN(v)) return false;
		this.timestamp = v; 
		this.value = this.format("%$%hh:%mm:%ss:%uu");
		return true;
	}
	
	this.format = function(formato){
		formato = formato.replace('%$', this.getSignal());
		formato = formato.replace('%hh', this.getHours(2));
		formato = formato.replace('%mm', this.getMinutes(2));
		formato = formato.replace('%ss', this.getSeconds(2));
		formato = formato.replace('%uu', this.getMiliseconds(3));
		formato = formato.replace('%h', this.getHours());
		formato = formato.replace('%m', this.getMinutes());
		formato = formato.replace('%s', this.getSeconds());
		formato = formato.replace('%u', this.getMiliseconds());
		return formato;
	}
	
	this.setTime = function(h,m,s,ms){
		if(h){
			if (typeof h == 'string'){
				return this.set(h);
			} else {
				if (!this.setHours(h)) return false;
			}
		}
		if(m){
			if (!this.setMinutes(m)) return false;
		}
		if(s){
			if (!this.setSeconds(s)) return false;
		}
		if(ms){
			if (!this.setMiliseconds(ms)) return false;
		}
	}
	
	this.set = function(hora){
		var 
			arrHora = hora.split(':'),
			h = Number(arrHora[0] || 0),
			m = Number(arrHora[1] || 0),
			s = Number(arrHora[2] || 0), 
			ms = Number(arrHora[3] || 0)
		return this.setTime(h,m,s,ms);
	}
	
	this.setHours = function(h){
		minutos = this.timestamp.mod(hora);
		val = (h * hora) + minutos;
		return this.setVal(val);
	}

	this.setMinutes = function(m){
		var 
			segundos = this.timestamp.mod(minuto);
			horas = this.timestamp.div(hora) * hora,
			val = (m * minuto) + horas + segundos;
		return this.setVal(val);
	}

	this.setSeconds = function(s){
		var 
			milisegundos = this.timestamp.mod(segundo);
			minutos = this.timestamp.div(minuto) * minuto,
			val = (s * segundo) + minutos + milisegundos;
		return this.setVal(val);
	}
	
	this.setMiliseconds = function(ms){
		var 
			segundos = this.timestamp.div(segundo) * segundo,
			val = ms + segundos;
		return this.setVal(val);
	}
	
	this.getSignal = function(){
		return this.timestamp > 0 ? '+' : '-';
	}
	
	this.getHours = function(n){
		var 
			n = n || 0;
			positivo = this.timestamp > 0,
			tmstp = positivo ? this.timestamp : 0 - this.timestamp;
		h = tmstp.div(hora);
		return digit(h, n);
	}

	this.getMinutes = function(n){
		var 
			n = n || 0;
			positivo = this.timestamp > 0,
			tmstp = positivo ? this.timestamp : 0 - this.timestamp;
		tmstp = tmstp.mod(hora);
		m = tmstp.div(minuto);
		return digit(m, n);
	}

	this.getSeconds = function(n){
		var 
			n = n || 0;
			positivo = this.timestamp > 0,
			tmstp = positivo ? this.timestamp : 0 - this.timestamp;
		tmstp = tmstp.mod(minuto);
		s = tmstp.div(segundo);
		return digit(s, n);
	}
	
	this.getMiliseconds = function(n){
		var 
			n = n || 0;
			positivo = this.timestamp > 0,
			tmstp = positivo ? this.timestamp : 0 - this.timestamp;
		tmstp = tmstp.mod(segundo);
		return digit(tmstp, n);
	}

	this.toMinutes = function(){
		var tmstp = this.timestamp;
		m = tmstp.div(minuto);
		return m;
	}

	this.toSeconds = function(){
		var tmstp = this.timestamp;
		s = tmstp.div(segundo);
		return s;
	}
	
	this.toMiliseconds = function(){
		return this.timestamp;
	}
	
	this.positive = function(){
		this.setVal(Math.abs(this.timestamp));
	}

	this.negative = function(){
		this.setVal(Math.abs(this.timestamp) * (-1));
	}
	
	this.merge = function(hora, multiplier){
		multiplier = multiplier || 1;
		if (this.testInstance(hora)) {
			this.addMiliseconds(hora.timestamp * multiplier) 
		}
	}
	
	this.add = function(hora){
		if (this.testInstance(hora)) {
			this.merge(hora);	
		}
	}
	
	this.sub = function(hora){
		if (this.testInstance(hora)) {
			this.merge(hora, -1);	
		}
	}
	
	this.diff = function(hora, formato){
		var diferenca = new Time();
		diferenca.addMiliseconds(this.timestamp);
		diferenca.sub(hora);
		if (formato)
			return diferenca.format(formato);
		return diferenca;
	}

	this.fromDate = function(data){
		if (data instanceof Date){
			this.set(data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds());
		} else {
			throw "Data inválida"
		}
	}

	this.fromNow = function(formato){
		var data = new Date(),
			now = new Time(data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds());
		return this.diff(now, formato);
	}

	this.toNow = function(formato){
		var data = new Date(),
			now = new Time(data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds());
		return now.diff(this, formato);
	}
	
	this.modify = function(valor){
		var 
			sinal = valor.match(/([-])/),
			horas = valor.match(/(\d+)\s*(?=hour)/),
			minutos = valor.match(/(\d+)\s*(?=minute)/),
			segundos = valor.match(/(\d+)\s*(?=second)/),
			milisegundos = valor.match(/(\d+)\s*(?=miliseconds)/);
			
		sinal = sinal ? sinal[1] : '';
		if (horas) this.addHours(sinal + horas[1]);
		if (minutos) this.addMinutes(sinal + minutos[1]);
		if (segundos) this.addSeconds(sinal + segundos[1]);
		if (milisegundos) this.addMiliseconds(sinal + milisegundos[1]);
	}
	
	this.addHours = function(h){
		return this.setVal(this.timestamp + (h * hora));
	}

	this.addMinutes = function(m){
		return this.setVal(this.timestamp + (m * minuto));
	}

	this.addSeconds = function(s){
		return this.setVal(this.timestamp + (s * segundo));
	}

	this.addMiliseconds = function(ms){
		return this.setVal(this.timestamp + ms);
	}
	
	this.testInstance = function(hora){
		if (!hora instanceof Time){
			throw "Argumento inválido";
			return false;
		}
		return true;
	}

	this.log = function(){
		console.log({
			sinal: this.getSignal(), 
			horas: this.getHours(),
			minutos: this.getMinutes(),
			segundos: this.getSeconds(),
			milisegundos: this.getMiliseconds(),
			timestamp: this.timestamp,
		});
	}
	
	if (initVal) {
		this.init(initVal);
	}
}

Time.create = function(hora) {
	return new this(hora);
}

Time.fromDate = function(data){
	if (data instanceof Date){
		var inst = new this(data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds());
		return inst;
	} else {
		throw "Data inválida"
	}
}

Time.now = function(){
	data = new Date();
	return this.fromDate(data);
}

function digit(n, d){
	n = "" + n;
	while (n.length < d){
		n = "0" + n;
	}
	return n;
}

Number.prototype.div = function (n){
	return Math.floor(this/n);
}

Number.prototype.mod = function(n){
	return Math.ceil((this/n - Math.floor(this/n)) * n);  
}
