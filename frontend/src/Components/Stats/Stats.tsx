import { useState, useEffect } from 'react';
import './Stats.css';
import { getUserStats } from '../../services/Api.service';
import { userProfileStore } from '../../utils/zustand.store';

interface Stats {
  correct_questions: number;
  failed: number;
  not_watched: number;
  passed: number;
  questions_todo: number;
  tests_todo: number;
  to_watch: number;
  watched: number;
  wrong_questions: number;
}

const Stats = () => {
  const { localProfileInfo } = userProfileStore();

  const [stats, setStats] = useState<Stats>({
    correct_questions: 0,
    failed: 0,
    not_watched: 0,
    passed: 0,
    questions_todo: 0,
    tests_todo: 0,
    to_watch: 0,
    watched: 0,
    wrong_questions: 0,
  });
  const [testsTotal, setTestTotal] = useState(0);
  const [questionssTotal, setQuestionsTotal] = useState(0);
  const [watchedTotal, setWatchedTotal] = useState(0);

  async function loadStats() {
    const res = await getUserStats(localProfileInfo.email);
    setStats(res?.data);
    setTestTotal(percentage(res?.data.passed, res?.data.failed));
    setQuestionsTotal(percentage(res?.data.correct_questions, res?.data.wrong_questions));
    setWatchedTotal(percentage(res?.data.watched, res?.data.not_watched));
  }

  useEffect(() => {
    loadStats();
  }, []);

  const percentage = (passed: number, failed: number) => {
    if(passed > 0 || failed > 0){
      return parseInt((passed / (passed + failed) * 100).toString());
    } else {
      return 100
    }
  }


  return (
    <div className='stats'>
      <h2 className='title'>Test</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle green'>
            <h2 className='stat_num'>{stats.passed}</h2>
          </div>
          <h3 className='stats_label'>Passed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle red'>
            <h2 className='stat_num'>{stats.failed}</h2>
          </div>
          <h3 className='stats_label'>Failed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle gray'>
            <h2 className='stat_num'>{stats.tests_todo}</h2>
          </div>
          <h3 className='stats_label'>Todo</h3>
        </div>
        <div className='stats_box'>
          <div className='circle gray'>
            <h2 className='stat_num'>{testsTotal}%</h2>
          </div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>

      <h2 className='title'>Questions</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle green'><h2 className='stat_num'>{stats.correct_questions}</h2></div>
          <h3 className='stats_label'>Passed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle red'>
            <h2 className='stat_num'>{stats.wrong_questions}</h2>
          </div>
          <h3 className='stats_label'>Failed</h3>
        </div>
        <div className='stats_box'>
          <div className='circle gray'>
            <h2 className='stat_num'>{stats.questions_todo}</h2>
          </div>
          <h3 className='stats_label'>Todo</h3>
        </div>
        <div className='stats_box'>
          <div className='circle gray'>
            <h2 className='stat_num'>{questionssTotal}%</h2>
          </div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>

      <h2 className='title'>Tutorials</h2>
      <div className='stats_row'>
        <div className='stats_box'>
          <div className='circle green'>
            <h2 className='stat_num'>{stats.watched}</h2>
          </div>
          <h3 className='stats_labe'>Watched</h3>
        </div>
        <div className='stats_box'>
          <div className='circle red'>
            <h2 className='stat_num'>{stats.to_watch}</h2>
          </div>
          <h3 className='stats_label'>To Watch</h3>
        </div>
        <div className='stats_box'>
          <div className='circle gray'>
            <h2 className='stat_num'>{watchedTotal}%</h2>
          </div>
          <h3 className='stats_label'>Total</h3>
        </div>
      </div>

    </div>
  )
}

export default Stats;