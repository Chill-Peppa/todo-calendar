import styles from './app.module.css';

import Calendar from '../calendar/calendar';

function App() {
  return (
    <div className={styles.app}>
      <Calendar />
    </div>
  );
}

export default App;
