/**
 * 日期时间格式化工具
 */

/**
 * 格式化日期为指定格式字符串
 * @param date 日期对象或时间戳
 * @param format 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * 支持的占位符：
 *   YYYY - 四位年份
 *   MM   - 两位月份
 *   DD   - 两位日期
 *   HH   - 两位小时（24小时制）
 *   mm   - 两位分钟
 *   ss   - 两位秒数
 */
export function formatDate(
  date?: Date | number | string,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  const d = date ? new Date(date) : new Date();

  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取当前时间的格式化字符串
 */
export function now(format = 'YYYY-MM-DD HH:mm:ss'): string {
  return formatDate(new Date(), format);
}
