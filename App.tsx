// É necessário importar essa biblioteca no contexto inicial da nossa aplicação, lembrando que nesse caso, é necessário configurar o
// arquivo babel.config.js para que funcione corretamente, porém, basta entrar na documentação do expo reanimated que tem o passo a passo
import 'react-native-gesture-handler';

import Routes from './src/routes';

// O app tem apenas a função de chamar o arquivo de rotas, que é onde está a navegação das telas, drawer e stacks
// Ele apenas servirá como arquivo de entrada para a aplicação
export default function App() {
  return (
    <Routes />
  );
}