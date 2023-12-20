class ProgressBar {
  currentProgressBarState = {
    initial: true,
    mid: false,
    end: false,
  };

  avancarEstado() {
    let values = Object.values(this.currentProgressBarState);

    let currentActiveValue;
    for (let index in values) {
      if (values[index]) {
        currentActiveValue = Number(index);
      }
    }

    if (!this.currentProgressBarState.end) {
      values[currentActiveValue] = false;
      values[currentActiveValue + 1] = true;
    }
    this.mudarValoresObjetoProgressBar(values);
  }

  voltarEstado() {
    let values = Object.values(this.currentProgressBarState);
    let currentActiveValue;
    for (let index in values) {
      if (values[index]) {
        currentActiveValue = Number(index);
      }
    }
    if (!this.currentProgressBarState.initial) {
      values[currentActiveValue] = false;
      values[currentActiveValue - 1] = true;
    }
    this.mudarValoresObjetoProgressBar(values);
  }

  mudarValoresObjetoProgressBar(values) {
    this.currentProgressBarState = {
      initial: values[0],
      mid: values[1],
      end: values[2],
    };
  }

  pegarEstadoAtualProgresBar() {
    for (let key in this.currentProgressBarState) {
      if (this.currentProgressBarState[key]) {
        return key;
      }
    }
  }
}

const progressBar = new ProgressBar();

document.getElementById('proximo').addEventListener('click', () => {
  const circlesContainer = Array.from(
    document.getElementById('progress-bar').children
  );
  let estadoAtualProgresBar = progressBar.pegarEstadoAtualProgresBar();

  const trocasDeEstado = {
    initial: () => {
      circlesContainer[2].classList.remove('circle-container');
      circlesContainer[2].children[0].classList.remove('circle');
      circlesContainer[2].classList.add('active-circle-container', 'rotate');
      circlesContainer[2].children[0].classList.add('active-circle');
      circlesContainer[1].classList.remove('line');
      circlesContainer[1].classList.add('line-active');
    },
    mid: () => {
      circlesContainer[4].classList.remove('circle-container');
      circlesContainer[4].children[0].classList.remove('circle');
      circlesContainer[4].classList.add('active-circle-container', 'rotate');
      circlesContainer[4].children[0].classList.add('active-circle');
      circlesContainer[3].classList.remove('line');
      circlesContainer[3].classList.add('line-active');
    },
    end: () => {},
  };
  progressBar.avancarEstado();
  trocasDeEstado[estadoAtualProgresBar]();
});

document.getElementById('voltar').addEventListener('click', () => {
  const circlesContainer = Array.from(
    document.getElementById('progress-bar').children
  );
  let estadoAtualProgresBar = progressBar.pegarEstadoAtualProgresBar();

  const trocasDeEstado = {
    initial: () => {},
    mid: () => {
      circlesContainer[2].classList.remove('active-circle-container', 'rotate');
      circlesContainer[2].children[0].classList.remove('active-circle');
      circlesContainer[2].classList.add('circle-container');
      circlesContainer[2].children[0].classList.add('circle');
      circlesContainer[1].classList.remove('line-active');
      circlesContainer[1].classList.add('line');
    },
    end: () => {
      circlesContainer[4].classList.remove('active-circle-container', 'rotate');
      circlesContainer[4].children[0].classList.remove('active-circle');
      circlesContainer[4].classList.add('circle-container');
      circlesContainer[4].children[0].classList.add('circle');
      circlesContainer[3].classList.remove('line-active');
      circlesContainer[3].classList.add('line');
    },
  };
  progressBar.voltarEstado();
  trocasDeEstado[estadoAtualProgresBar]();
});
