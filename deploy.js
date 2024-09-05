import { deploy } from 'sftp-sync-deploy';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загрузка переменных окружения
dotenv.config({ path: `${__dirname}/.env.local` });

// Получение режима из аргументов командной строки
const args = process.argv.slice(2);
const modeIndex = args.indexOf('--demo') !== -1 ? '--demo' : args.indexOf('--prod') !== -1 ? '--prod' : null;
const mode = modeIndex === '--demo' ? 'demo' : modeIndex === '--prod' ? 'prod' : 'demo'; // По умолчанию 'demo'

if (mode !== 'demo' && mode !== 'prod') {
  console.error('Укажите корректный режим: --demo или --prod.');
  process.exit(1);
}

/**
 * Конфигурация для подключения к удалённому серверу.
 * @type {SftpConfig}
 */
const config = {
  host: process.env[`FTP_${mode.toUpperCase()}_HOST`],
  port: 22,
  username: process.env[`FTP_${mode.toUpperCase()}_USER`],
  password: process.env[`FTP_${mode.toUpperCase()}_PASSWORD`],
  agent: process.env.SSH_AUTH_SOCK,
  localDir: 'dist',
  remoteDir: process.env[`FTP_${mode.toUpperCase()}_DEST`],
};

/**
 * Опции для настройки синхронизации.
 * @type {SftpOptions}
 */
const options = {
  dryRun: false,
  exclude: ['node_modules', 'src/**/*.spec.ts', '.env'],
  excludeMode: 'remove',
  forceUpload: false,
};

/**
 * Выполняет деплой с заданной конфигурацией и опциями.
 * @async
 * @function
 * @throws {Error} Ошибка при деплое.
 */
async function deployFiles() {
  try {
    await deploy(config, options);
    console.log('Деплой успешно завершён!');
  } catch (err) {
    console.error('Ошибка при деплое: ', err);
  }
}

deployFiles();
