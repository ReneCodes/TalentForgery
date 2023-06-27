import { useState, useEffect } from 'react';
import './Stats.css';

const mockStats = {
  testsPassed: 3000,
  testsFailed: 80,
  testsTodo: 80,
  questionsPassed: 4000,
  questionsFailed: 2000,
  questionsTodo: 4000,
  watched: 4000,
  toWatch: 300 
}

const templateStats = {
  testsPassed: 0,
  testsFailed: 0,
  testsTodo: 0,
  questionsPassed: 0,
  questionsFailed: 0,
  questionsTodo: 0,
  watched: 0,
  toWatch: 0 
}

interface Stats {
  testsPassed: number,
  testsFailed: number,
  testsTodo: number,
  questionsPassed: number,
  questionsFailed: number,
  questionsTodo: number,
  watched: number,
  toWatch: number
}

const Stats = () => {
  const [stats, setStats] = useState<Stats>(templateStats);
  const [testsTotal, setTestTotal] = useState(0);
  const [questionssTotal, setQuestionsTotal] = useState(0);
  const [watchedTotal, setWatchedTotal] = useState(0);

  useEffect(() => {
    setStats(mockStats);
    setTestTotal(percentage(mockStats.testsPassed, mockStats.testsFailed));
    setQuestionsTotal(percentage(mockStats.questionsPassed, mockStats.questionsFailed));
    setWatchedTotal(percentage(mockStats.watched, mockStats.toWatch));
  }, []);

  const percentage = (passed: number, failed: number) => {
    return parseInt((passed / (passed + failed) * 100).toString());
  }

  return <div>
    <div className='stats'>
      <h2 className='title'>Test</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.testsPassed}</h2></div>
          <h3 className='stats_label'>Passed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.testsFailed}</h2></div>
          <h3 className='stats_label'>Failed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.testsTodo}</h2></div>
          <h3 className='stats_label'>Todo</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{testsTotal}%</h2></div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>
    </div>

    <h2 className='title'>Questions</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.questionsPassed}</h2></div>
          <h3 className='stats_label'>Passed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.questionsFailed}</h2></div>
          <h3 className='stats_label'>Failed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.questionsTodo}</h2></div>
          <h3 className='stats_label'>Todo</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{questionssTotal}%</h2></div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>

      <h2 className='title'>Tutorials</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.watched}</h2></div>
          <h3 className='stats_label'>Watched</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{stats.toWatch}</h2></div>
          <h3 className='stats_label'>To Watch</h3>
        </div>
        <div className='stats_box'>
          <div className='circle'><h2 className='stat_num'>{watchedTotal}%</h2></div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>
  </div>
}

export default Stats;