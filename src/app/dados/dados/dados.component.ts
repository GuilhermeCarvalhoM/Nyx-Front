import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LinearScale, registerables } from 'chart.js';
import { DadosService } from '../services/dados.service';

import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(...registerables);

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css'],
})
export class DadosComponent {
  constructor(private dados: DadosService) {}

  meuGrafico: Chart = {} as Chart;
  meuGrafico2: Chart = {} as Chart;
  meuGrafico3: Chart = {} as Chart;

  ngOnInit(): void {
    this.despesasTotaisPorMes();
    this.despesasTotaisPorCategorias();
    this.despesasTotaisPorFonte();
  }

  despesasTotaisPorMes() {
    this.dados.despesasTotaisPorMes().subscribe((response: any) => {
      this.chartDespesasTotaisPorMes(response);
    });
  }

  chartDespesasTotaisPorMes(dados: any[]) {
    const ctx = document.getElementById('meuGrafico') as HTMLCanvasElement;

    const labels = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const data = dados.map((item: any) => item.despesas_totais);

    this.meuGrafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Despesas por Mês',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  despesasTotaisPorCategorias() {
    this.dados.despesasTotaisPorCategorias().subscribe((response: any) => {
      this.chartDespesasTotaisPorCategorias(response);
    });
  }

  chartDespesasTotaisPorCategorias(dados: any[]) {
    const ctx = document.getElementById('meuGrafico2') as HTMLCanvasElement;

    const labels = dados.map((item: any) => item.categoria_economica_nome);
    const data = dados.map((item: any) => item.despesas_totais);

    this.meuGrafico2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Despesas por categoria',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  despesasTotaisPorFonte() {
    this.dados.agrupamentoPorFonte().subscribe((response: any) => {
      this.chartDespesasTotaisPorFontes(response);
    });
  }

  chartDespesasTotaisPorFontes(dados: any[]) {
    const ctx = document.getElementById('meuGrafico3') as HTMLCanvasElement;

    const labels = dados.map((item: any) => item.fonte_recurso_nome);
    const data = dados.map((item: any) => item.despesas_totais);

    // Ordenar os arrays labels e data em ordem ascendente
    const sortedData = data
      .map((value, index) => ({ value, index }))
      .sort((a, b) => a.value - b.value);

    const sortedLabels = sortedData.map((item) => labels[item.index]);
    const sortedDataValues = sortedData.map((item) => item.value);

    // Definir a faixa de tamanho dos pontos
    const minSize = 5; // Tamanho mínimo do ponto
    const maxSize = 20; // Tamanho máximo do ponto

    this.meuGrafico3 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: 'Despesas Totais por Fontes',
            data: sortedDataValues.map((value, index) => ({
              x: index + 1, // Ajustar a posição x
              y: value, // Usar o valor original no eixo y
              r: maxSize, // Tamanho máximo do ponto
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false, // Ocultar os ticks do eixo x
            },
          },
          y: {
            type: 'logarithmic', // Usar escala logarítmica no eixo y
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
            formatter: function (value, context) {
              return `${sortedLabels[context.dataIndex]}: ${value}`;
            },
          },
        },
      },
    });
  }
}
