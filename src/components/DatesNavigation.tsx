import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import DateSelectTable from './DateSelectTable';
import { ClipDateStateDataProp } from '../lib/types';

interface DatesNavProp {
  CDStateData: ClipDateStateDataProp;
}

function DatesNavigation({ CDStateData }: DatesNavProp) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Just doing some shortening because I don't like refactoring everything
  const date_id = CDStateData.date_id;

  useEffect(() => {
    if (isNaN(date_id)) {
      setIsExpanded(true);
    }
  }, [date_id]);

  const handleButtonClick = () => {
    if (!isNaN(date_id))
      setIsExpanded(!isExpanded);
  };

  return (
    <div id="datesnavbackground" className={`fixed bottom-0 left-0 w-full bg-gray-900 transition-all duration-500 ${isExpanded ? 'h-full' : 'h-16'}`}>
      <div className={`bg-navcolor p-4 mw-full flex justify-between items-end py-4 ${isExpanded ? '' : 'pb-8'}`}>
        <AudioPlayer CDStateData={CDStateData} />
        <button className="text-sm" onClick={handleButtonClick}>
          {
            isExpanded ? (
              date_id ? 'Close' : 'Please pick a date'
            ) : 'Open'}
        </button>
      </div>
      <DateSelectTable CDStateData={CDStateData} setIsExpanded={setIsExpanded} />
    </div>
  );
}

export default DatesNavigation;