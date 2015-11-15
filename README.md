<h1>time.js</h1>

<h3>Biblioteca para cálculo de Horas em Javascript puro, sem dependência da classe Date();</h3>

<h2>Básica</h2>

Criar uma instância de Time() com valor 0<br/>
<code>var t = new Time();
Time {timestamp: 0, value: "00:00:00:000"}</code>

Criar uma instância com hora<br/>
<code>var t = new Time('12:02:05:100'); Time {timestamp: 43325100, value: "+12:02:05:100"}</code>

<h2>Métodos</h2>

Altera o horário, de acordo com os parâmetros fornecidos<br/>
<code>setTime(h,m,s,ms);</code> 

Altera o horário, de acordo com a string fornecida, conforme o formato do [value] acima.<br/>
<code>setTime(horario)</code>

Alteram cada parte da hora. Se o valor da parte alterada exceder o valor máximo, o valor subsequente é alterado.<br/>
<code>setHours(h);</code><br/>
<code>setMinutes(m);</code><br/>
<code>setSeconds(s);</code><br/>
<code>setMiliseconds(ms);</code><br/>
Ex: setMinutes(120) aumenta 2 horas.<br/>

Retornam a parte da hora atual. O parãmetro [d] é opcional e indica o número de dígitos do retorno.<br/>
<code>getHours(d);</code><br/>
<code>getMinutes(d);</code><br/>
<code>getSeconds(d);</code><br/>
<code>getMiliseconds(d);</code><br/>
Ex: Hora = 12:03:57<br/>
getMinutes(); //retorna 3;<br/>
getMinutes(2); //retorna 03;<br/>

Retornam o valor da Hora atual, convertido no padrão solicitado.<br/>
<code>toMinutes();</code><br/>
<code>toSeconds();</code><br/>
<code>toMiliseconds();</code><br/>
Ex: Hora = 12:03:57<br/>
toMinutes(); //retorna 12*60 + 3 = 723 minutos<br/>

<code>positive();</code> //Transforma uma hora em hora positiva<br/>
<code>negative();</code> //TRansforma uma hora em hora negativa<br/>

<code>merge(Time);</code> Combina dois objetos Time();<br/>
<code>add(Time);</code> Adiciona a hora de um objeto Time() ao objeto atual;<br/>
<code>sub(Time);</code> Subtrai a hora de um objeto Time() do objeto atual;<br/>
<code>diff(Time);</code> Retorna a diferença entre o objeto atual e o informado;<br/>

<code>modify(valor);</code> Modifica o horário atual; sintaxe similar ao PHP;<br/>
[+,-, sem sinal] hour(s) minute(s) second(s) milisecond(s)<br/>
Ex: Hora = 12:00<br/>
modify('+1 hour'); //13:00<br/>
modify('-15 minutes') //12:45<br/>
modify('60 seconds') //12:46<br/>

Adiciona o horário atual;<br/>
<code>addHour(h);</code><br/>
<code>addMinute(m);</code><br/>
<code>addSecond(s);</code><br/>
<code>addMilisecond(ms);</code><br/>
Ex: Hora = 12:00<br/>
addHour(5); //17:00<br/>

<code>log()</code><br/>
Método utilizado apenas durante o desenvolvimento, deve ser descontinuado na versão final<br/>
Faz o console.log() dos atributos;<br/>


