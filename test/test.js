/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const { execSync } = require('child_process');
const fs = require('fs');
const assert = require('assert');

const markomatic = require('../index');

describe('Markomatic!', function () {
    describe('Flat template ("include" prop)', function () {
        this.beforeEach(function () {
            // Make sure there's no previous result
            if (fs.existsSync('./result/complete-test.md')) {
                fs.unlinkSync('./result/complete-test.md');
            }
        });

        it('extracts correctly using markomatic as node module', function () {
            markomatic('./fixture/complete-test/source/markomatic.yaml');
            assert.deepStrictEqual(
                fs.readFileSync('./result/complete-test.md'),
                fs.readFileSync('./fixture/complete-test/expected/result.md'),
            );
        });

        it('extracts correctly using markomatic as cli tool', function () {
            // const os = process.platform;
            /** @type {any} */
            const execSyncProp = {
                timeout: 60000,
                stdio: 'inherit',
            };

            execSync('markomatic ./fixture/complete-test/source/markomatic.yaml', execSyncProp);
            assert.deepStrictEqual(
                fs.readFileSync('./result/complete-test.md'),
                fs.readFileSync('./fixture/complete-test/expected/result.md'),
            );
        });

        it('extracts correctly using markomatic as cli tool (2)', function () {
            // const os = process.platform;
            /** @type {any} */
            const execSyncProp = {
                timeout: 60000,
                stdio: 'inherit',
            };

            execSync('cd ./fixture/complete-test/source/ && markomatic markomatic.yaml', execSyncProp);
            assert.deepStrictEqual(
                fs.readFileSync('./result/complete-test.md'),
                fs.readFileSync('./fixture/complete-test/expected/result.md'),
            );
        });

        it('keeps escaped \\r\\n and \\n', function () {
            markomatic('./fixture/crlf-lf-test/markomatic.yaml');
            assert.deepStrictEqual(
                fs.readFileSync('./result/complete-test.md'),
                fs.readFileSync('./fixture/crlf-lf-test/expected.md'),
            );
        });
    });

    describe('Template Module ("useModule" prop)', function () {
        this.beforeEach(function () {
            // Make sure there's no previous result
            if (fs.existsSync('./result/complete-test.md')) {
                fs.unlinkSync('./result/complete-test.md');
            }
        });

        it('passes test A', function () {
            // const os = process.platform;
            /** @type {any} */
            const execSyncProp = {
                timeout: 60000,
                stdio: 'inherit',
            };

            execSync('markomatic ./fixture/using-template-module/a-config.yaml', execSyncProp);
            assert.deepStrictEqual(
                fs.readFileSync('./result/complete-test.md'),
                fs.readFileSync('./fixture/using-template-module/a-expected.md'),
            );
        });
    });

    describe('Yaml validation', function () {
        it('throws error when the config doesn\'t contain markomatic prop', function () {
            assert.throws(function () {
                markomatic('./fixture/no-markomatic-prop/config.yaml');
            },
            new Error('The provided yaml file doesn\'t have markomatic property.'));
        });
    });

    this.afterAll(function () {
        if (fs.existsSync('./result/complete-test.md')) {
            fs.unlinkSync('./result/complete-test.md');
        }
    });
});
