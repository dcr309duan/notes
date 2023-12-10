/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');
var child_process = require('child_process');
var util = require('util');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_SETTINGS = {
    fcitxRemotePath_macOS: '/usr/local/bin/fcitx-remote',
    fcitxRemotePath_windows: 'C:\\Program Files\\bin\\fcitx-remote',
    fcitxRemotePath_linux: '/usr/bin/fcitx-remote',
};
const pexec = util.promisify(child_process.exec);
var IMStatus;
(function (IMStatus) {
    IMStatus[IMStatus["None"] = 0] = "None";
    IMStatus[IMStatus["Activate"] = 1] = "Activate";
    IMStatus[IMStatus["Deactivate"] = 2] = "Deactivate";
})(IMStatus || (IMStatus = {}));
class VimIMSwitchPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.imStatus = IMStatus.None;
        this.fcitxRemotePath = "";
        this.editorMode = null;
        this.initialized = false;
        this.cmEditor = null;
        this.onVimModeChange = (cm) => __awaiter(this, void 0, void 0, function* () {
            if (cm.mode == "normal" || cm.mode == "visual") {
                yield this.getFcitxRemoteStatus();
                if (this.imStatus == IMStatus.Activate) {
                    yield this.deactivateIM();
                }
            }
            else if (cm.mode == "insert" || cm.mode == "replace") {
                if (this.imStatus == IMStatus.Activate) {
                    yield this.activateIM();
                }
            }
        });
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading plugin VimIMSwitchPlugin.');
            yield this.loadSettings();
            // this.addStatusBarItem().setText('Vim IM Swith Enabled');
            this.addSettingTab(new IMSwitchSettingTab(this.app, this));
            this.app.workspace.on('file-open', (file) => __awaiter(this, void 0, void 0, function* () {
                console.log("file-open");
                if (!this.initialized)
                    yield this.initialize();
                // {mode: string, ?subMode: string} object. Modes: "insert", "normal", "replace", "visual". Visual sub-modes: "linewise", "blockwise"}
                if (this.cmEditor) {
                    // default is normal mode, try to deactivate the IM.
                    yield this.deactivateIM();
                    this.cmEditor.off("vim-mode-change", this.onVimModeChange);
                    this.cmEditor.on("vim-mode-change", this.onVimModeChange);
                }
            }));
            // Used when we open a new markdown view by "split vertically", 
            // which will not trigger 'file-open' event on obsidian v0.15.6
            this.app.workspace.on('active-leaf-change', (leaf) => __awaiter(this, void 0, void 0, function* () {
                console.log("active-leaf-change");
                if (this.app.workspace.activeLeaf.view.getViewType() == "markdown") {
                    console.log("focus on markdown view");
                    if (!this.initialized)
                        yield this.initialize();
                    // {mode: string, ?subMode: string} object. Modes: "insert", "normal", "replace", "visual". Visual sub-modes: "linewise", "blockwise"}
                    if (this.cmEditor) {
                        // default is normal mode, try to deactivate the IM.
                        yield this.deactivateIM();
                        this.cmEditor.off("vim-mode-change", this.onVimModeChange);
                        this.cmEditor.on("vim-mode-change", this.onVimModeChange);
                    }
                }
            }));
        });
    }
    initialize() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized)
                return;
            console.log("initialize");
            // Determine if we have the legacy Obsidian editor (CM5) or the new one (CM6).
            // This is only available after Obsidian is fully loaded, so we do it as part of the `file-open` event.
            if ('editor:toggle-source' in this.app.commands.editorCommands) {
                this.editorMode = 'cm6';
                console.log('VimIMSwitchPlugin: using CodeMirror 6 mode');
            }
            else {
                this.editorMode = 'cm5';
                console.log('VimIMSwitchPlugin: using CodeMirror 5 mode');
            }
            // For CM6 this actually returns an instance of the object named CodeMirror from cm_adapter of codemirror_vim
            const view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (this.editorMode == 'cm6')
                this.cmEditor = (_c = (_b = (_a = view.sourceMode) === null || _a === void 0 ? void 0 : _a.cmEditor) === null || _b === void 0 ? void 0 : _b.cm) === null || _c === void 0 ? void 0 : _c.cm;
            else
                this.cmEditor = (_d = view.sourceMode) === null || _d === void 0 ? void 0 : _d.cmEditor;
        });
    }
    runCmd(cmd, args = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield pexec(`${cmd} ${args.join(" ")}`);
            return output.stdout;
        });
    }
    getFcitxRemoteStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fcitxRemotePath == "") {
                console.log("VIM-IM-Switch-pugin: cannot get fcitx-remote path, please set it correctly.");
                return;
            }
            let fcitxRemoteOutput = yield this.runCmd(this.fcitxRemotePath);
            fcitxRemoteOutput = fcitxRemoteOutput.trimRight();
            if (fcitxRemoteOutput == "1") {
                this.imStatus = IMStatus.Deactivate;
            }
            else if (fcitxRemoteOutput == "2") {
                this.imStatus = IMStatus.Activate;
            }
            else {
                this.imStatus = IMStatus.None;
            }
            console.log("Vim-IM-Swith-plugin: IM status " + this.imStatus.toString());
        });
    }
    activateIM() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fcitxRemotePath == "") {
                console.log("VIM-IM-Switch-pugin: cannot get fcitx-remote path, please set it correctly.");
                return;
            }
            const output = yield this.runCmd(this.fcitxRemotePath, ["-o"]);
            console.log("Vim-IM-Swith-plugin: activate IM " + output);
        });
    }
    deactivateIM() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fcitxRemotePath == "") {
                console.log("VIM-IM-Switch-pugin: cannot get fcitx-remote path, please set it correctly.");
                return;
            }
            const output = yield this.runCmd(this.fcitxRemotePath, ["-c"]);
            console.log("Vim-IM-Swith-plugin: deactivate IM " + output);
        });
    }
    onunload() {
        if (this.cmEditor) {
            this.cmEditor.off("vim-mode-change", this.onVimModeChange);
        }
        console.log('unloading plugin VimIMSwitchPlugin.');
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
            this.updateCurrentPath();
        });
    }
    updateCurrentPath() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (process.platform) {
                case 'darwin':
                    this.fcitxRemotePath = this.settings.fcitxRemotePath_macOS;
                    break;
                case 'linux':
                    this.fcitxRemotePath = this.settings.fcitxRemotePath_linux;
                    break;
                case 'win32':
                    this.fcitxRemotePath = this.settings.fcitxRemotePath_windows;
                    break;
                default:
                    console.log('VIM-IM-Switch-plugin: does not support ' + process.platform + ' currently.');
                    break;
            }
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
class IMSwitchSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Vim IM Switch plugin.' });
        new obsidian.Setting(containerEl)
            .setName('Fcitx Remote Path for macOS')
            .setDesc('The absolute path to fcitx-remote bin file on macOS.')
            .addText(text => text
            .setPlaceholder(DEFAULT_SETTINGS.fcitxRemotePath_macOS)
            .setValue(this.plugin.settings.fcitxRemotePath_macOS)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.fcitxRemotePath_macOS = value;
            this.plugin.updateCurrentPath();
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Fcitx Remote Path for Linux')
            .setDesc('The absolute path to fcitx-remote bin file on Linux.')
            .addText(text => text
            .setPlaceholder(DEFAULT_SETTINGS.fcitxRemotePath_linux)
            .setValue(this.plugin.settings.fcitxRemotePath_linux)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.fcitxRemotePath_linux = value;
            this.plugin.updateCurrentPath();
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Fcitx Remote Path for Windows')
            .setDesc('The absolute path to fcitx-remote bin file on Windows.')
            .addText(text => text
            .setPlaceholder(DEFAULT_SETTINGS.fcitxRemotePath_windows)
            .setValue(this.plugin.settings.fcitxRemotePath_windows)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.fcitxRemotePath_windows = value;
            this.plugin.updateCurrentPath();
            yield this.plugin.saveSettings();
        })));
    }
}

module.exports = VimIMSwitchPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbInByb21pc2lmeSIsImV4ZWMiLCJQbHVnaW4iLCJNYXJrZG93blZpZXciLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENB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
