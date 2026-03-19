function FindProxyForURL(url, host) {
    // 1. Список доменов, которые должны идти через прокси
    var proxyDomains = [
        "roskazna.ru",
		"sudrf.ru",
		"isiac.app",
		"iactmb.ru",
		"2ip.ru",
        "yummyani.me"
    ];

    // 2. Настройки прокси
    var proxy = "PROXY 10.68.254.34:8080";


    // 3. Локальные хосты всегда идут напрямую
    if (isPlainHostName(host) || 
        host == "127.0.0.1" || 
        host == "localhost") {
        return "DIRECT";
    }

    // 4. Проверяем, входит ли текущий хост в список проксируемых
    for (var i = 0; i < proxyDomains.length; i++) {
        var domain = proxyDomains[i];
        
        // Точное совпадение
        if (domain == host) {
            return proxy;
        }
        
        // Проверка на поддомены (если указан domain.com - проходят и sub.domain.com)
        if (dnsDomainIs(host, domain)) {
            return proxy;
        }
    }

    // 5. Всё остальное идет напрямую
    return "DIRECT";
}