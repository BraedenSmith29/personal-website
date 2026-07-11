<script lang="ts">
    import {SunIcon, CloudIcon, CloudRainIcon, CloudLightningIcon, SnowflakeIcon, CloudFogIcon, MoonIcon} from 'phosphor-svelte';
    import {onMount} from 'svelte';

    interface WeatherStatus {
        temp: number | null;
        condition: number | null;
    }

    let time = $state(new Date());
    let weather: WeatherStatus = $state({temp: null, condition: null});
    let isDay = $state(true);

    $effect(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
    };

    async function fetchWeather() {
        try {
            // Fort Worth coordinates: 32.7555, -97.3308
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.7555&longitude=-97.3308&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit');
            const data = await res.json();
            if (data.current) {
                weather = {
                    temp: Math.round(data.current.temperature_2m),
                    condition: data.current.weather_code
                };
                isDay = data.current.is_day === 1;
            }
        } catch (e) {
            console.error('Failed to fetch weather', e);
        }
    }

    onMount(() => {
        fetchWeather();
    });

    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    function getWeatherIcon(code: number | null) {
        if (code === null) return CloudIcon;
        if (code === 0) return isDay ? SunIcon : MoonIcon;
        if (code >= 1 && code <= 3) return isDay ? CloudIcon : MoonIcon; // Partly cloudy
        if (code >= 45 && code <= 48) return CloudFogIcon;
        if (code >= 51 && code <= 67) return CloudRainIcon;
        if (code >= 71 && code <= 77) return SnowflakeIcon;
        if (code >= 80 && code <= 82) return CloudRainIcon;
        if (code >= 95) return CloudLightningIcon;
        return CloudIcon;
    }

    const WeatherIcon = $derived(getWeatherIcon(weather.condition));
</script>

<div class="status-line">
    <span class="location">Fort Worth, TX</span>
    <span class="separator">/</span>
    <div class="weather">
        <WeatherIcon size={14} weight="regular"/>
        <span class="temp">{weather.temp !== null ? weather.temp + '°' : '--'}</span>
    </div>
    <span class="separator">/</span>
    <span class="time">{formatTime(time)}</span>
</div>

<style>
    .status-line {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: var(--body-font), sans-serif;
        font-size: 0.85rem;
        color: var(--muted-color);
    }

    .location {
        font-weight: 500;
    }

    .weather {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .temp {
        font-weight: 500;
    }

    .time {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
    }

    .separator {
        opacity: 0.3;
        font-weight: 300;
    }

    @media (max-width: 600px) {
        .status-line {
            display: none;
        }
    }
</style>
