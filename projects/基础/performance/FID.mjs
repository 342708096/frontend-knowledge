/**
 * FID: 首次输入延迟的计算方法
 */

const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const FID = entry.processingStart - entry.startTime;
  
      console.log("FID:", FID);
    }
  });
  
  // Start observing first-input entries.
  
  observer.observe({
    type: "first-input",
  
    buffered: true,
  });
