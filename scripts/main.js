document.addEventListener("DOMContentLoaded", function() {
    var options = {
        chart: {
            type: 'line',
            height: 200,
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: 'inherit'
        },
        series: [
            {
                name: 'Serie A',
                data: [12, 19, 15, 22, 18, 24, 20]
            },
            {
                name: 'Serie B',
                data: [10, 14, 12, 17, 15, 19, 16]
            }
        ],
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
            labels: { style: { colors: '#202938' } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            labels: { style: { colors: '#202938' } }
        },
        colors: ['#F84960', '#008080'],
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColors: ['#F84960', '#008080'],
            strokeWidth: 2
        },
        grid: {
            borderColor: '#eee',
            strokeDashArray: 4
        },
        legend: {
            labels: { colors: '#202938' }
        },
        tooltip: {
            theme: 'light'
        }
    };
    var chart = new ApexCharts(document.querySelector("#apexLineChart"), options);
    chart.render();
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.svg-magnifier-wrapper').forEach(function(wrapper) {
        const svg = wrapper.querySelector('svg');
        const circle = wrapper.querySelector('.magnifier-circle');
        const magnifierRadius = 50; // px
        const zoom = 2;
        let viewport = null;
        let zoomedSvg = null;

        function createViewport() {
            if (viewport) return viewport;
            viewport = document.createElement('div');
            viewport.className = 'magnifier-viewport';
            viewport.style.position = 'absolute';
            viewport.style.width = (magnifierRadius * 2) + 'px';
            viewport.style.height = (magnifierRadius * 2) + 'px';
            viewport.style.borderRadius = '50%';
            viewport.style.overflow = 'hidden';
            viewport.style.border = '2px solid #F84960';
            viewport.style.boxShadow = '0 2px 8px rgba(32,41,56,0.15)';
            viewport.style.pointerEvents = 'none';
            viewport.style.zIndex = 10;
            viewport.style.display = 'none';
            wrapper.appendChild(viewport);

            // SVG ampliado
            zoomedSvg = svg.cloneNode(true);
            zoomedSvg.removeAttribute('id');
            zoomedSvg.style.position = 'absolute';
            zoomedSvg.style.left = '0';
            zoomedSvg.style.top = '0';
            zoomedSvg.style.width = svg.width.baseVal.value + 'px';
            zoomedSvg.style.height = svg.height.baseVal.value + 'px';
            zoomedSvg.style.transformOrigin = '0 0';
            zoomedSvg.style.filter = 'none'; // a color
            viewport.appendChild(zoomedSvg);

            return viewport;
        }

        function onMouseMove(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Mueve el viewport circular
            const vp = createViewport();
            vp.style.left = (x - magnifierRadius) + 'px';
            vp.style.top = (y - magnifierRadius) + 'px';
            vp.style.display = 'block';

            // Mueve y escala el SVG ampliado dentro del viewport
            const offsetX = -x * (zoom) + magnifierRadius;
            const offsetY = -y * (zoom) + magnifierRadius;
            zoomedSvg.style.transform = `scale(${zoom}) translate(${offsetX/zoom}px, ${offsetY/zoom}px)`;

            // No ocultes el SVG original, solo deja el viewport encima
        }
        function onMouseLeave() {
            if (viewport) viewport.style.display = 'none';
            // No modifiques el SVG original
        }
        function onMouseEnter() {
            // No modifiques el SVG original
        }
        // svg.classList.remove('hide-svg'); // Ya no es necesario
        wrapper.addEventListener('mousemove', onMouseMove);
        wrapper.addEventListener('mouseleave', onMouseLeave);
        wrapper.addEventListener('mouseenter', onMouseEnter);
    });
});