"use strict";
/*
 * This file is part of IodineGBA
 *
 * Copyright (C) 2012-2013 Grant Galitz
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 * The full license is available at http://www.gnu.org/licenses/gpl.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 */
function GameBoyAdvanceChannel3AttributeTable(sound) {
    this.sound = sound;
    this.currentSampleLeft = 0;
    this.currentSampleLeftSecondary = 0;
    this.currentSampleRight = 0;
    this.currentSampleRightSecondary = 0;
    this.lastSampleLookup = 0;
    this.canPlay = false;
    this.WAVERAMBankSpecified = 0;
    this.WAVERAMBankAccessed = 0x20;
    this.WaveRAMBankSize = 0x1F;
    this.totalLength = 0x100;
    this.patternType = 4;
    this.frequency = 0;
    this.FrequencyPeriod = 0x4000;
    this.consecutive = true;
    this.Enabled = false;
    this.nr30 = 0;
    this.nr31 = 0;
    this.nr32 = 0;
    this.nr33 = 0;
    this.nr34 = 0;
    this.cachedSample = 0;
    this.PCM = getInt8Array(0x40);
    this.WAVERAM = getUint8Array(0x20);
}
GameBoyAdvanceChannel3AttributeTable.prototype.updateCache = function () {
    if ((this.patternType | 0) != 3) {
        this.cachedSample = this.PCM[this.lastSampleLookup | 0] >> (this.patternType | 0);
    }
    else {
        this.cachedSample = (this.PCM[this.lastSampleLookup | 0] * 0.75) | 0;
    }
    this.outputLevelCache();
}
GameBoyAdvanceChannel3AttributeTable.prototype.outputLevelCache = function () {
    this.currentSampleLeft = (this.sound.leftChannel3) ? (this.cachedSample | 0) : 0;
    this.currentSampleRight = (this.sound.rightChannel3) ? (this.cachedSample | 0) : 0;
    this.outputLevelSecondaryCache();
}
GameBoyAdvanceChannel3AttributeTable.prototype.outputLevelSecondaryCache = function () {
    if (this.Enabled) {
        this.currentSampleLeftSecondary = this.currentSampleLeft | 0;
        this.currentSampleRightSecondary = this.currentSampleRight | 0;
    }
    else {
        this.currentSampleLeftSecondary = 0;
        this.currentSampleRightSecondary = 0;
    }
}
GameBoyAdvanceChannel3AttributeTable.prototype.writeWAVE = function (address, data) {
    address = address | 0;
    data = data | 0;
    if (this.canPlay) {
        this.sound.audioJIT();
    }
    address = ((address | 0) + (this.WAVERAMBankAccessed >> 1)) | 0;
    this.WAVERAM[address | 0] = data | 0;
    address <<= 1;
    this.PCM[address | 0] = data >> 4;
    this.PCM[address | 1] = data & 0xF;
}
GameBoyAdvanceChannel3AttributeTable.prototype.readWAVE = function (address) {
    address = ((address | 0) + (this.WAVERAMBankAccessed >> 1)) | 0;
    return this.WAVERAM[address | 0] | 0;
}
GameBoyAdvanceChannel3AttributeTable.prototype.enableCheck = function () {
    this.Enabled = (/*this.canPlay && */(this.consecutive || (this.totalLength | 0) > 0));
}