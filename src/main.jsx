import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  LogOut,
  Plus,
  Save,
  Sparkles,
  Trophy,
  UserRound,
  X,
  Check,
  CalendarDays,
  TableProperties,
  LockKeyhole,
  Eye,
  EyeOff
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

const DAYLIS_ICON = 'data:image/jpeg;base64,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';

const styleElement = document.createElement('style');
styleElement.textContent = `
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #2e351f;
  background: #f3eadb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 245, 225, .9), transparent 40%),
    linear-gradient(180deg, #f7efe3 0%, #eee3d1 100%);
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.login-page,
.app-page {
  min-height: 100vh;
}

.login-page {
  display: grid;
  place-items: center;
  padding: 28px 18px;
}

.login-shell {
  width: min(740px, 100%);
  background: rgba(255, 250, 241, .88);
  border: 1px solid rgba(88, 102, 53, .16);
  border-radius: 32px;
  padding: 28px;
  box-shadow: 0 22px 60px rgba(73, 72, 42, .12);
  backdrop-filter: blur(14px);
}

.app-icon {
  width: 112px;
  height: 112px;
  border-radius: 28px;
  object-fit: cover;
  display: block;
  margin-bottom: 24px;
  box-shadow: 0 12px 26px rgba(65, 76, 36, .18);
}

.login-copy h1,
.hero-panel h1,
.month-panel h2,
.modal h2 {
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: -.03em;
}

.login-copy h1 {
  margin: 6px 0 8px;
  font-size: clamp(32px, 6vw, 50px);
}

.login-copy p,
.hero-panel p {
  color: #6b6d5c;
  margin: 0;
  line-height: 1.6;
}

.eyebrow {
  color: #65733f;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: .16em;
  font-weight: 800;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 28px;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(87, 103, 53, .16);
  background: #fffaf1;
  color: #354021;
  border-radius: 18px;
  padding: 12px 14px;
  font-weight: 700;
  transition: .2s ease;
}

.profile-button:hover {
  transform: translateY(-2px);
  border-color: rgba(87, 103, 53, .38);
  box-shadow: 0 10px 20px rgba(77, 80, 47, .08);
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #fff9ed;
  background: linear-gradient(145deg, #75884a, #4f6130);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.35);
}

.admin-button {
  background: #65733f;
  color: #fffaf1;
}

.admin-button .profile-avatar {
  background: rgba(255,255,255,.16);
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px max(18px, calc((100vw - 980px) / 2));
  background: rgba(247, 239, 227, .9);
  border-bottom: 1px solid rgba(82, 95, 49, .12);
  backdrop-filter: blur(16px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
}

.brand img {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  object-fit: cover;
}

.brand div {
  display: flex;
  flex-direction: column;
}

.brand strong {
  font-family: Georgia, serif;
  font-size: 21px;
}

.brand span {
  color: #777866;
  font-size: 12px;
}

.icon-button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(82, 95, 49, .14);
  border-radius: 14px;
  color: #556533;
  background: #fffaf1;
}

.main-content {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 46px;
}

.hero-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  background: linear-gradient(145deg, #f8dfba, #edc99a);
  border: 1px solid rgba(91, 102, 56, .17);
  border-radius: 28px;
  padding: 24px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.65);
}

.hero-panel h1 {
  margin: 5px 0 7px;
  font-size: clamp(30px, 5vw, 48px);
}

.hero-badge {
  flex: 0 0 auto;
  width: 58px;
  height: 58px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: #fff8e9;
  background: linear-gradient(145deg, #718347, #4d5d2f);
  box-shadow: 0 10px 24px rgba(68, 80, 38, .2), inset 0 1px 0 rgba(255,255,255,.25);
}

.tabs {
  display: flex;
  gap: 10px;
  margin: 18px 0;
}

.tab {
  border: 1px solid rgba(89, 102, 54, .16);
  background: rgba(255,250,241,.72);
  color: #667049;
  border-radius: 15px;
  padding: 10px 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 750;
}

.tab.active {
  color: #fff9ed;
  background: #60713b;
  border-color: #60713b;
}

.student-picker {
  background: rgba(255,250,241,.72);
  border: 1px solid rgba(89,102,54,.13);
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 16px;
}

.student-picker label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #6b7551;
  margin-bottom: 7px;
}

.student-picker select {
  width: 100%;
  border: 1px solid rgba(85,100,50,.19);
  border-radius: 13px;
  padding: 11px 12px;
  color: #354020;
  background: #fffaf1;
}

.month-panel {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 14px;
  border-radius: 22px;
  background: rgba(255,250,241,.72);
  border: 1px solid rgba(85,100,50,.13);
}

.month-panel span {
  color: #76805f;
  font-size: 12px;
  font-weight: 750;
}

.month-panel h2 {
  margin: 2px 0 0;
  font-size: 28px;
}

.month-arrow {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 15px;
  background: #e7d4b7;
  color: #526031;
}

.month-arrow:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.legend {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 16px 2px;
}

.legend > span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #6d715d;
  font-size: 13px;
  font-weight: 700;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 11px;
}

.day-card {
  min-height: 118px;
  text-align: left;
  border: 1px solid rgba(89, 102, 54, .14);
  border-radius: 19px;
  padding: 13px;
  background: rgba(255,250,241,.8);
  color: #2f381d;
  transition: .2s ease;
}

.day-card:hover {
  transform: translateY(-2px);
  border-color: rgba(89, 102, 54, .32);
  box-shadow: 0 12px 24px rgba(71, 75, 43, .08);
}

.day-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekday {
  color: #858671;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.day-card > strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 32px;
  margin-top: 12px;
}

.day-points {
  color: #7a7c69;
  font-size: 11px;
  font-weight: 700;
}

.day-status {
  width: 30px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  border-radius: 11px;
  flex: 0 0 auto;
}

.day-status-done {
  color: #fff9ec;
  background: linear-gradient(145deg, #7b8e4d, #4d6030);
  border: 1px solid rgba(63,76,35,.35);
  box-shadow:
    0 5px 10px rgba(60,72,35,.18),
    inset 0 1px 0 rgba(255,255,255,.35);
}

.day-status-extra {
  color: #fff7df;
  background:
    radial-gradient(circle at 30% 25%, rgba(255,255,255,.55), transparent 28%),
    linear-gradient(145deg, #f6dc77, #efc84d 55%, #dba933);
  border: 1px solid rgba(171,131,33,.34);
  box-shadow:
    0 5px 12px rgba(186,145,34,.22),
    inset 0 1px 0 rgba(255,255,255,.48);
}

.day-status-extra-only {
  color: #fffdf8;
  background: linear-gradient(145deg, #b8bcb7, #959b96);
  border: 1px solid rgba(120,126,122,.35);
  box-shadow:
    0 5px 12px rgba(113,118,114,.16),
    inset 0 1px 0 rgba(255,255,255,.48);
}

.day-status-missed {
  color: #f5ead8;
  background: linear-gradient(145deg, #3c4530, #1f281b);
  border: 1px solid rgba(31,40,27,.4);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
}

.day-status-empty {
  background: #efe1cd;
  border: 1px solid rgba(99,103,75,.13);
  box-shadow: inset 0 1px 2px rgba(90,86,58,.06);
}


.monthly-month-panel {
  margin-bottom: 0;
}

.monthly-legend {
  align-items: center;
}

.monthly-hint {
  margin-left: auto;
  color: #7b7f67 !important;
  font-weight: 650 !important;
}

.monthly-table-card {
  overflow: hidden;
  border: 1px solid rgba(85,100,50,.14);
  border-radius: 22px;
  background: rgba(255,250,241,.82);
  box-shadow: 0 12px 28px rgba(71,75,43,.06);
}

.monthly-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.monthly-table {
  width: max-content;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #354020;
}

.monthly-table th,
.monthly-table td {
  border-right: 1px solid rgba(85,100,50,.10);
  border-bottom: 1px solid rgba(85,100,50,.10);
}

.monthly-table thead th {
  position: sticky;
  top: 0;
  z-index: 3;
  background: #ead8ba;
}

.monthly-name-head,
.monthly-student-name {
  position: sticky;
  left: 0;
  z-index: 4;
  min-width: 118px;
  width: 118px;
  text-align: left;
}

.monthly-name-head {
  padding: 14px 13px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.monthly-student-name {
  padding: 9px 10px;
  background: #fff8ec;
}

.monthly-student-name span {
  display: block;
  font-size: 15px;
  font-weight: 800;
}

.monthly-student-name small {
  display: inline-block;
  margin-top: 3px;
  color: #78864f;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.monthly-day-head {
  min-width: 42px;
  width: 42px;
  padding: 8px 4px;
  text-align: center;
}

.monthly-day-head span {
  display: block;
  color: #79815d;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
}

.monthly-day-head strong {
  display: block;
  margin-top: 2px;
  font-family: Georgia, serif;
  font-size: 16px;
}

.monthly-total-head,
.monthly-total-cell {
  min-width: 60px;
  width: 60px;
  text-align: center;
  font-weight: 850;
}

.monthly-total-head {
  padding: 10px 5px;
}

.monthly-total-cell {
  background: #fff8ec;
  color: #596837;
}

.monthly-cell {
  min-width: 42px;
  width: 42px;
  height: 44px;
  padding: 0;
  text-align: center;
  background: rgba(255,253,247,.68);
}

.monthly-cell-button {
  width: 100%;
  height: 44px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: default;
}

.monthly-cell-button.editable {
  cursor: pointer;
}

.monthly-cell-button.editable:hover {
  background: rgba(113,131,71,.08);
}

.monthly-cell-button:disabled {
  opacity: 1;
}

.monthly-cell .day-status {
  width: 24px;
  height: 24px;
  border-radius: 10px;
}

.current-student-row .monthly-student-name,
.current-student-row .monthly-total-cell {
  background: #eef0dc;
}

.monthly-table tbody tr:last-child th,
.monthly-table tbody tr:last-child td {
  border-bottom: 0;
}

.monthly-table th:last-child,
.monthly-table td:last-child {
  border-right: 0;
}

@media (max-width: 680px) {
  .tabs {
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .tab {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .monthly-hint {
    width: 100%;
    margin-left: 0;
  }

  .monthly-name-head,
  .monthly-student-name {
    min-width: 105px;
    width: 105px;
  }

  .monthly-student-name {
    padding: 9px 8px;
  }

  .monthly-student-name span {
    font-size: 11px;
  }

  .monthly-day-head,
  .monthly-cell {
    min-width: 43px;
    width: 43px;
  }

  .monthly-cell-button {
    height: 49px;
  }
}

.ranking-list {
  display: grid;
  gap: 12px;
}

.ranking-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 24px;
  background: rgba(255,250,241,.82);
  border: 1px solid rgba(86,99,51,.14);
}

.ranking-toggle button {
  border: none;
  border-radius: 18px;
  padding: 14px 16px;
  font-weight: 850;
  font-size: 15px;
  color: #6f7856;
  background: transparent;
}

.ranking-toggle button.active {
  color: #314019;
  background: linear-gradient(145deg, #f5df81, #efca53);
}

.ranking-card {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 15px;
  align-items: center;
  padding: 18px;
  background: rgba(255,250,241,.8);
  border: 1px solid rgba(86,99,51,.14);
  border-radius: 24px;
}

.rank-card-1 {
  background: linear-gradient(145deg, rgba(255,244,196,.95), rgba(244,205,90,.72));
  border-color: rgba(196,151,29,.22);
  box-shadow: 0 12px 28px rgba(206,165,38,.14);
}

.rank-card-2 {
  background: linear-gradient(145deg, rgba(247,248,252,.96), rgba(207,212,221,.86));
  border-color: rgba(160,166,179,.22);
  box-shadow: 0 12px 28px rgba(163,168,181,.12);
}

.rank-card-3 {
  background: linear-gradient(145deg, rgba(244,220,189,.96), rgba(205,145,90,.84));
  border-color: rgba(166,107,55,.22);
  box-shadow: 0 12px 28px rgba(167,110,61,.14);
}

.rank-number {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: #ead8bd;
  color: #526033;
  font-family: Georgia, serif;
  font-weight: 800;
  font-size: 24px;
  position: relative;
}

.rank-card-1 .rank-number {
  background: linear-gradient(145deg, #fff2ae, #d9ad34);
  color: #7b5100;
  box-shadow: 0 10px 24px rgba(199,155,34,.25), inset 0 1px 0 rgba(255,255,255,.55);
}

.rank-card-2 .rank-number {
  background: linear-gradient(145deg, #fbfcff, #bfc4ce);
  color: #58606e;
  box-shadow: 0 10px 24px rgba(162,166,177,.2), inset 0 1px 0 rgba(255,255,255,.55);
}

.rank-card-3 .rank-number {
  background: linear-gradient(145deg, #f0c390, #ae6f37);
  color: #6b3412;
  box-shadow: 0 10px 24px rgba(162,102,55,.2), inset 0 1px 0 rgba(255,255,255,.4);
}

.rank-medal {
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: 18px;
}

.rank-digit {
  font-size: 30px;
  line-height: 1;
}

.ranking-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.ranking-heading strong {
  font-size: 18px;
}

.ranking-heading span {
  color: #556432;
  font-weight: 850;
}

.ranking-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
  color: #7a7d68;
  font-size: 12px;
  font-weight: 700;
}

.ranking-stats span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(38,44,27,.48);
  display: grid;
  place-items: center;
  padding: 18px;
  backdrop-filter: blur(7px);
}

.modal {
  width: min(620px, 100%);
  max-height: calc(100vh - 36px);
  overflow-y: auto;
  background: #fffaf1;
  border: 1px solid rgba(95,105,60,.16);
  border-radius: 28px;
  padding: 20px;
  box-shadow: 0 24px 80px rgba(25,30,18,.28);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.modal h2 {
  margin: 4px 0 0;
  font-size: 30px;
}

.listening-check {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(89,101,54,.16);
  border-radius: 18px;
  padding: 14px;
  background: #f7ead6;
  cursor: pointer;
}

.listening-check input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-check {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: transparent;
  background: #eadcc7;
  border: 1px solid rgba(81,94,48,.18);
  transition: .15s ease;
}

.listening-check input:checked + .custom-check {
  color: #fff9ed;
  background: linear-gradient(145deg, #77894a, #4f6030);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.28);
}

.listening-check strong,
.listening-check small {
  display: block;
}

.listening-check small {
  margin-top: 3px;
  color: #747765;
}

.field {
  display: block;
  margin-top: 16px;
}

.field > span {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 7px;
  font-weight: 800;
  font-size: 13px;
}

.field b {
  color: #6f7c49;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

textarea,
.extra-row input {
  width: 100%;
  border: 1px solid rgba(84,98,50,.18);
  border-radius: 15px;
  padding: 12px 13px;
  color: #323a22;
  background: #fffdf8;
  outline: none;
}

textarea:focus,
.extra-row input:focus,
.student-picker select:focus {
  border-color: #718148;
  box-shadow: 0 0 0 3px rgba(113,129,72,.12);
}

.extras-section {
  margin-top: 18px;
  border-top: 1px solid rgba(91,101,60,.13);
  padding-top: 17px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #61703e;
  margin-bottom: 11px;
}

.section-title strong,
.section-title span {
  display: block;
}

.section-title span {
  margin-top: 3px;
  color: #7b7e6c;
  font-size: 12px;
}

.extra-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  margin-top: 9px;
}

.remove-extra {
  width: 43px;
  border: 1px solid rgba(80,94,46,.14);
  border-radius: 13px;
  background: #efe1cd;
  color: #5d6841;
}

.add-extra {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 11px;
  border: none;
  background: transparent;
  color: #5f6f3c;
  font-weight: 850;
  padding: 7px 2px;
}

.error-message {
  color: #7c332a;
  background: #f6dfd7;
  border: 1px solid #e8c6ba;
  border-radius: 13px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 700;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-top: 18px;
}

.points-preview {
  color: #727561;
  font-size: 12px;
  font-weight: 800;
}

.delete-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(156,82,72,.16);
  border-radius: 14px;
  padding: 11px 17px;
  color: #8a4338;
  background: #fff3ef;
  font-weight: 800;
}

.save-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 14px;
  padding: 11px 17px;
  color: #fffaf0;
  background: linear-gradient(145deg, #748548, #506132);
  box-shadow: 0 8px 16px rgba(66,78,37,.18);
  font-weight: 850;
}

@media (max-width: 760px) {
  .profile-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .days-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .login-shell {
    padding: 20px;
    border-radius: 24px;
  }

  .app-icon {
    width: 92px;
    height: 92px;
    border-radius: 24px;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .hero-panel {
    padding: 19px;
  }

  .hero-badge {
    width: 50px;
    height: 50px;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .tab {
    justify-content: center;
  }

  .days-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .day-card {
    min-height: 108px;
    padding: 11px;
  }

  .day-card > strong {
    font-size: 28px;
  }

  .ranking-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }

  .modal-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .save-button,
  .delete-button {
    justify-content: center;
  }
}

.sync-message { color:#667049; font-weight:700; margin:0 0 14px; }


.secure-login {
  margin-top: 28px;
  display: grid;
  gap: 15px;
}

.login-field {
  display: grid;
  gap: 7px;
}

.login-field > span {
  color: #626d43;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.login-field select,
.password-input-wrap {
  width: 100%;
  border: 1px solid rgba(85,100,50,.19);
  border-radius: 15px;
  color: #354020;
  background: #fffaf1;
}

.login-field select {
  padding: 13px 14px;
}

.password-input-wrap {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  color: #65733f;
}

.password-input-wrap input {
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  padding: 13px 0;
  color: #354020;
  background: transparent;
}

.show-password {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 11px;
  display: grid;
  place-items: center;
  color: #627043;
  background: transparent;
}

.login-button {
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 13px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fffaf0;
  background: linear-gradient(145deg, #748548, #506132);
  box-shadow: 0 8px 16px rgba(66,78,37,.18);
  font-weight: 850;
}

.login-button:disabled {
  opacity: .65;
  cursor: wait;
}
`;
document.head.appendChild(styleElement);

const STUDENTS = [
  'Allyazi',
  'Dariya',
  'Assel',
  'Adela',
  'Bayan',
  'Lora',
  'Anasteisha',
  'Zhanna'
];

function pad(value) {
  return String(value).padStart(2, '0');
}

function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function getMonthDays(year, month) {
  const count = new Date(year, month + 1, 0).getDate();
  const firstDay = year === 2026 && month === 6 ? 14 : 1;
  return Array.from({ length: count - firstDay + 1 }, (_, i) => firstDay + i);
}

function getEntry(data, student, key) {
  return data?.[student]?.[key] || {
    listened: false,
    comment: '',
    extras: []
  };
}

function getValidExtras(entry) {
  return (entry.extras || []).filter((item) => item.trim());
}

function hasListening(entry) {
  return Boolean(entry.listened && entry.comment.trim());
}

function statusForEntry(entry, date) {
  const validExtras = getValidExtras(entry);
  if (hasListening(entry) && validExtras.length > 0) return 'extra';
  if (hasListening(entry)) return 'done';
  if (!hasListening(entry) && validExtras.length > 0) return 'extra-only';

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  if (new Date() > endOfDay) return 'missed';
  return 'empty';
}

function pointsForEntry(entry) {
  const validExtras = getValidExtras(entry);
  if (hasListening(entry)) return 1 + validExtras.length;
  return validExtras.length * 0.5;
}

function formatPoints(points) {
  return Number.isInteger(points) ? String(points) : points.toFixed(1).replace(/\.0$/, '');
}

function statsForStudent(data, student, options = {}) {
  const { mode = 'all', year, month } = options;
  const entries = Object.entries(data?.[student] || {}).filter(([entryDate]) => {
    if (mode !== 'month') return true;
    return entryDate.startsWith(`${year}-${pad(month + 1)}`);
  }).map(([, entry]) => entry);

  const listeningDays = entries.filter((entry) => hasListening(entry)).length;
  const extraTasks = entries.reduce((sum, entry) => sum + getValidExtras(entry).length, 0);
  const totalPoints = entries.reduce((sum, entry) => sum + pointsForEntry(entry), 0);
  const extraOnlyTasks = entries.reduce((sum, entry) => {
    const extras = getValidExtras(entry).length;
    return !hasListening(entry) ? sum + extras : sum;
  }, 0);
  return {
    listeningDays,
    extraTasks,
    extraOnlyTasks,
    totalPoints
  };
}

function DayStatus({ status }) {
  if (status === 'done') {
    return (
      <span className="day-status day-status-done" aria-label="Listening completed">
        <Check size={19} strokeWidth={3} />
      </span>
    );
  }

  if (status === 'extra') {
    return (
      <span className="day-status day-status-extra" aria-label="Listening and extra completed">
        <Sparkles size={19} strokeWidth={2.5} />
      </span>
    );
  }

  if (status === 'extra-only') {
    return (
      <span className="day-status day-status-extra-only" aria-label="Only extra completed">
        <Check size={19} strokeWidth={3} />
      </span>
    );
  }

  if (status === 'missed') {
    return (
      <span className="day-status day-status-missed" aria-label="Not completed">
        <X size={18} strokeWidth={2.8} />
      </span>
    );
  }

  return <span className="day-status day-status-empty" aria-label="Not filled yet" />;
}

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeView, setActiveView] = useState('table');
  const [viewedStudent, setViewedStudent] = useState(STUDENTS[0]);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);
  const [rankingMode, setRankingMode] = useState('month');
  const [rankingYear, setRankingYear] = useState(2026);
  const [rankingMonth, setRankingMonth] = useState(6);
  const [selectedDay, setSelectedDay] = useState(null);
  const [draft, setDraft] = useState({ listened: false, comment: '', extras: [''] });
  const [error, setError] = useState('');
  const [selectedLogin, setSelectedLogin] = useState(STUDENTS[0]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setSyncError('Supabase is not connected yet. Add the environment variables.');
      return;
    }

    let active = true;

    const applySession = async (session) => {
      if (!session?.user) {
        if (active) {
          setCurrentUser('');
          setIsAdmin(false);
          setData({});
          setLoading(false);
        }
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('daylis_profiles')
        .select('student_name, role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile) {
        if (active) {
          setLoginError('Profile was not found. Ask the admin to finish the Supabase setup.');
          setLoading(false);
        }
        await supabase.auth.signOut();
        return;
      }

      if (active) {
        setCurrentUser(profile.student_name);
        setIsAdmin(profile.role === 'admin');
        setViewedStudent(STUDENTS[0]);
        setLoading(true);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => applySession(session));

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !currentUser) return;

    let active = true;

    const loadEntries = async () => {
      const { data: rows, error: loadError } = await supabase
        .from('daylis_entries')
        .select('student_name, entry_date, listened, comment, extras');

      if (loadError) {
        if (active) {
          setSyncError(loadError.message);
          setLoading(false);
        }
        return;
      }

      const next = {};
      for (const row of rows || []) {
        next[row.student_name] ||= {};
        next[row.student_name][row.entry_date] = {
          listened: row.listened,
          comment: row.comment || '',
          extras: Array.isArray(row.extras) ? row.extras : []
        };
      }

      if (active) {
        setData(next);
        setSyncError('');
        setLoading(false);
      }
    };

    loadEntries();

    const channel = supabase
      .channel(`daylis-entries-live-${currentUser}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'daylis_entries' },
        () => loadEntries()
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  const visibleStudent = isAdmin ? viewedStudent : currentUser;
  const orderedStudents = useMemo(() => {
    if (STUDENTS.includes(currentUser)) {
      return [currentUser, ...STUDENTS.filter((student) => student !== currentUser)];
    }
    return STUDENTS;
  }, [currentUser]);
  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(
    new Date(year, month, 1)
  );
  const rankingMonthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(
    new Date(rankingYear, rankingMonth, 1)
  );
  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const canGoPrevious = year > 2026 || month > 6;
  const canRankingGoPrevious = rankingYear > 2026 || rankingMonth > 6;

  const openDay = (day) => {
    const key = dateKey(year, month, day);
    const entry = getEntry(data, visibleStudent, key);
    setSelectedDay(day);
    setDraft({
      listened: Boolean(entry.listened),
      comment: entry.comment || '',
      extras: entry.extras?.length ? [...entry.extras] : ['']
    });
    setError('');
  };

  const saveDay = async () => {
    const validExtras = draft.extras.map((item) => item.trim()).filter(Boolean);
    if (!draft.listened && validExtras.length === 0) {
      setError('Please add extra practice or mark listening.');
      return;
    }
    if (draft.listened && !draft.comment.trim()) {
      setError('Please write what you listened to.');
      return;
    }

    if (!isSupabaseConfigured) {
      setError('Supabase is not connected. Add the project URL and publishable key.');
      return;
    }

    const key = dateKey(year, month, selectedDay);
    const payload = {
      student_name: visibleStudent,
      entry_date: key,
      listened: Boolean(draft.listened),
      comment: draft.listened ? draft.comment.trim() : '',
      extras: validExtras,
      updated_at: new Date().toISOString()
    };

    const { error: saveError } = await supabase
      .from('daylis_entries')
      .upsert(payload, { onConflict: 'student_name,entry_date' });

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setData((previous) => ({
      ...previous,
      [visibleStudent]: {
        ...(previous[visibleStudent] || {}),
        [key]: payload
      }
    }));
    setSelectedDay(null);
  };

  const deleteDay = async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not connected.');
      return;
    }
    const key = dateKey(year, month, selectedDay);
    const { error: deleteError } = await supabase
      .from('daylis_entries')
      .delete()
      .eq('student_name', visibleStudent)
      .eq('entry_date', key);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setData((previous) => {
      const nextStudent = { ...(previous[visibleStudent] || {}) };
      delete nextStudent[key];
      return {
        ...previous,
        [visibleStudent]: nextStudent
      };
    });
    setSelectedDay(null);
  };

  const changeMonth = (direction) => {
    const next = new Date(year, month + direction, 1);
    if (next < new Date(2026, 6, 1)) return;
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const changeRankingMonth = (direction) => {
    const next = new Date(rankingYear, rankingMonth + direction, 1);
    if (next < new Date(2026, 6, 1)) return;
    setRankingYear(next.getFullYear());
    setRankingMonth(next.getMonth());
  };

  const login = async () => {
    if (!isSupabaseConfigured) {
      setLoginError('Supabase is not connected yet.');
      return;
    }

    if (!password) {
      setLoginError('Please enter your password.');
      return;
    }

    setLoginLoading(true);
    setLoginError('');

    const loginEmail = `${selectedLogin.toLowerCase()}@daylis.app`;
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password
    });

    if (signInError) {
      setLoginError('Incorrect profile or password.');
      setLoginLoading(false);
      return;
    }

    setPassword('');
    setLoginLoading(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setCurrentUser('');
    setIsAdmin(false);
    setData({});
    setActiveView('table');
    setSelectedDay(null);
    setPassword('');
  };

  const ranking = useMemo(() => {
    const sorted = STUDENTS.map((student) => ({
      student,
      ...statsForStudent(data, student, {
        mode: rankingMode,
        year: rankingYear,
        month: rankingMonth
      })
    })).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      return a.student.localeCompare(b.student);
    });

    let lastPoints = null;
    let lastRank = 0;
    return sorted.map((item, index) => {
      const rank = item.totalPoints === lastPoints ? lastRank : index + 1;
      lastPoints = item.totalPoints;
      lastRank = rank;
      return { ...item, rank };
    });
  }, [data, rankingMode, rankingYear, rankingMonth]);

  if (!currentUser) {
    return (
      <div className="login-page">
        <div className="login-shell">
          <img className="app-icon" src={DAYLIS_ICON} alt="Daylis app icon" />
          <div className="login-copy">
            <span className="eyebrow">Daily English practice</span>
            <h1>Welcome to Daylis</h1>
            <p>Choose your profile and enter your personal password.</p>
          </div>

          <div className="secure-login">
            <label className="login-field">
              <span>Profile</span>
              <select
                value={selectedLogin}
                onChange={(event) => {
                  setSelectedLogin(event.target.value);
                  setLoginError('');
                }}
              >
                {STUDENTS.map((student) => (
                  <option key={student} value={student}>{student}</option>
                ))}
                <option value="Admin">Admin</option>
              </select>
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="password-input-wrap">
                <LockKeyhole size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setLoginError('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') login();
                  }}
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {loginError && <p className="error-message">{loginError}</p>}
            {syncError && <p className="error-message">{syncError}</p>}

            <button
              className="login-button"
              type="button"
              onClick={login}
              disabled={loginLoading}
            >
              <LockKeyhole size={18} />
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <header className="topbar">
        <div className="brand">
          <img src={DAYLIS_ICON} alt="" />
          <div>
            <strong>Daylis</strong>
            <span>Daily English listening</span>
          </div>
        </div>
        <button className="icon-button" onClick={logout} aria-label="Log out">
          <LogOut size={19} />
        </button>
      </header>

      <main className="main-content">
        {syncError && <p className="error-message">{syncError}</p>}
        {loading && <p className="sync-message">Loading shared data…</p>}
        <section className="hero-panel">
          <div>
            <span className="eyebrow">{isAdmin ? 'Admin dashboard' : 'Your practice space'}</span>
            <h1>
              {activeView === 'table'
                ? 'Daily Listening Table'
                : activeView === 'monthly'
                  ? 'Monthly Table'
                  : 'Ranking'}
            </h1>
            <p>
              {activeView === 'table'
                ? 'Listen for at least 15 minutes every day and record what you completed.'
                : activeView === 'monthly'
                  ? 'See the whole month and every participant in one shared table.'
                  : 'Points are earned from daily listening and every extra activity.'}
            </p>
          </div>
          <div className="hero-badge">
            {activeView === 'table'
              ? <Headphones size={22} />
              : activeView === 'monthly'
                ? <TableProperties size={22} />
                : <Trophy size={22} />}
          </div>
        </section>

        <nav className="tabs" aria-label="Main sections">
          <button
            className={activeView === 'table' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('table')}
          >
            <CalendarDays size={17} />
            Daily Table
          </button>
          <button
            className={activeView === 'monthly' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('monthly')}
          >
            <TableProperties size={17} />
            Monthly Table
          </button>
          <button
            className={activeView === 'ranking' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('ranking')}
          >
            <Trophy size={17} />
            Ranking
          </button>
        </nav>

        {activeView === 'table' ? (
          <>
            {isAdmin && (
              <section className="student-picker">
                <label htmlFor="student-select">View student</label>
                <select
                  id="student-select"
                  value={viewedStudent}
                  onChange={(event) => setViewedStudent(event.target.value)}
                >
                  {STUDENTS.map((student) => (
                    <option key={student}>{student}</option>
                  ))}
                </select>
              </section>
            )}

            <section className="month-panel">
              <button
                className="month-arrow"
                onClick={() => changeMonth(-1)}
                disabled={!canGoPrevious}
                aria-label="Previous month"
              >
                <ChevronLeft size={21} />
              </button>
              <div>
                <span>{visibleStudent}</span>
                <h2>{monthName} {year}</h2>
              </div>
              <button
                className="month-arrow"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight size={21} />
              </button>
            </section>

            <section className="legend">
              <span><DayStatus status="done" /> Listening</span>
              <span><DayStatus status="extra" /> Listening + Extra</span>
              <span><DayStatus status="extra-only" /> Only extra</span>
              <span><DayStatus status="missed" /> Missed</span>
            </section>

            <section className="days-grid">
              {days.map((day) => {
                const key = dateKey(year, month, day);
                const entry = getEntry(data, visibleStudent, key);
                const date = new Date(year, month, day);
                const status = statusForEntry(entry, date);
                const dayPoints = pointsForEntry(entry);

                return (
                  <button className="day-card" key={day} onClick={() => openDay(day)}>
                    <div className="day-card-top">
                      <span className="weekday">
                        {new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)}
                      </span>
                      <DayStatus status={status} />
                    </div>
                    <strong>{day}</strong>
                    <span className="day-points">
                      {dayPoints > 0 ? `${formatPoints(dayPoints)} ${dayPoints === 1 ? 'point' : 'points'}` : 'Open'}
                    </span>
                  </button>
                );
              })}
            </section>
          </>
        ) : activeView === 'monthly' ? (
          <>
            <section className="month-panel monthly-month-panel">
              <button
                className="month-arrow"
                onClick={() => changeMonth(-1)}
                disabled={!canGoPrevious}
                aria-label="Previous month"
              >
                <ChevronLeft size={21} />
              </button>
              <div>
                <span>All participants</span>
                <h2>{monthName} {year}</h2>
              </div>
              <button
                className="month-arrow"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight size={21} />
              </button>
            </section>

            <section className="legend monthly-legend">
              <span><DayStatus status="done" /> Listening</span>
              <span><DayStatus status="extra" /> Listening + Extra</span>
              <span><DayStatus status="extra-only" /> Only extra</span>
              <span><DayStatus status="missed" /> Missed</span>
              <span className="monthly-hint">
                {isAdmin ? 'Tap any cell to edit.' : 'Tap a cell in your own row to edit.'}
              </span>
            </section>

            <section className="monthly-table-card">
              <div className="monthly-table-scroll">
                <table className="monthly-table">
                  <thead>
                    <tr>
                      <th className="monthly-name-head">Student</th>
                      {days.map((day) => {
                        const date = new Date(year, month, day);
                        return (
                          <th key={day} className="monthly-day-head">
                            <span>{new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)}</span>
                            <strong>{day}</strong>
                          </th>
                        );
                      })}
                      <th className="monthly-total-head">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedStudents.map((student) => {
                      const monthPoints = days.reduce((total, day) => {
                        const entry = getEntry(data, student, dateKey(year, month, day));
                        return total + pointsForEntry(entry);
                      }, 0);

                      return (
                        <tr key={student} className={student === currentUser ? 'current-student-row' : ''}>
                          <th className="monthly-student-name">
                            <span>{student}</span>
                            {student === currentUser && <small>You</small>}
                          </th>
                          {days.map((day) => {
                            const key = dateKey(year, month, day);
                            const entry = getEntry(data, student, key);
                            const date = new Date(year, month, day);
                            const status = statusForEntry(entry, date);
                            const canEditCell = isAdmin || student === currentUser;

                            return (
                              <td key={day} className="monthly-cell">
                                <button
                                  type="button"
                                  className={canEditCell ? 'monthly-cell-button editable' : 'monthly-cell-button'}
                                  disabled={!canEditCell}
                                  title={
                                    canEditCell
                                      ? `${student} — ${monthName} ${day}`
                                      : `${student} — view only`
                                  }
                                  onClick={() => {
                                    if (!canEditCell) return;
                                    if (isAdmin) setViewedStudent(student);
                                    const selectedEntry = getEntry(data, student, key);
                                    setSelectedDay(day);
                                    setDraft({
                                      listened: Boolean(selectedEntry.listened),
                                      comment: selectedEntry.comment || '',
                                      extras: selectedEntry.extras?.length
                                        ? [...selectedEntry.extras]
                                        : ['']
                                    });
                                    setError('');
                                  }}
                                >
                                  <DayStatus status={status} />
                                </button>
                              </td>
                            );
                          })}
                          <td className="monthly-total-cell">{formatPoints(monthPoints)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="ranking-toggle">
              <button
                className={rankingMode === 'month' ? 'active' : ''}
                onClick={() => setRankingMode('month')}
              >
                By month
              </button>
              <button
                className={rankingMode === 'all' ? 'active' : ''}
                onClick={() => setRankingMode('all')}
              >
                All time
              </button>
            </section>

            {rankingMode === 'month' && (
              <section className="month-panel monthly-month-panel">
                <button
                  className="month-arrow"
                  onClick={() => changeRankingMonth(-1)}
                  disabled={!canRankingGoPrevious}
                  aria-label="Previous ranking month"
                >
                  <ChevronLeft size={21} />
                </button>
                <div>
                  <span>Ranking period</span>
                  <h2>{rankingMonthName} {rankingYear}</h2>
                </div>
                <button
                  className="month-arrow"
                  onClick={() => changeRankingMonth(1)}
                  aria-label="Next ranking month"
                >
                  <ChevronRight size={21} />
                </button>
              </section>
            )}

            <section className="ranking-list">
              {ranking.map((item) => {
                const medal = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '';
                const cardClass = item.rank <= 3 ? `ranking-card rank-card-${item.rank}` : 'ranking-card';
                return (
                  <article className={cardClass} key={item.student}>
                    <div className={`rank-number ${item.rank <= 3 ? `rank-${item.rank}` : ''}`}>
                      {medal && <span className="rank-medal">{medal}</span>}
                      <span className="rank-digit">{item.rank}</span>
                    </div>
                    <div className="ranking-main">
                      <div className="ranking-heading">
                        <strong>{item.student}</strong>
                        <span>{formatPoints(item.totalPoints)} points</span>
                      </div>
                      <div className="ranking-stats">
                        <span><Check size={15} /> {item.listeningDays} Listening days</span>
                        <span><Sparkles size={15} /> {item.extraTasks} Extra tasks</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>

      {selectedDay !== null && (
        <div className="modal-backdrop" role="presentation">
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header">
              <div>
                <span className="eyebrow">{visibleStudent}</span>
                <h2 id="modal-title">{monthName} {selectedDay}</h2>
              </div>
              <button className="icon-button" onClick={() => setSelectedDay(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <label className="listening-check">
              <input
                type="checkbox"
                checked={draft.listened}
                onChange={(event) =>
                  setDraft((previous) => ({ ...previous, listened: event.target.checked }))
                }
              />
              <span className="custom-check"><Check size={17} /></span>
              <span>
                <strong>I listened for at least 15 minutes</strong>
                <small>Required · +1 point</small>
              </span>
            </label>

            <label className="field">
              <span>What did you listen to? <b>{draft.listened ? 'Required' : 'Optional'}</b></span>
              <textarea
                rows="3"
                value={draft.comment}
                placeholder="Example: BBC 6 Minute English — How to learn from mistakes"
                onChange={(event) =>
                  setDraft((previous) => ({ ...previous, comment: event.target.value }))
                }
              />
            </label>

            <div className="extras-section">
              <div className="section-title">
                <div>
                  <strong>Extra Practice</strong>
                  <span>{draft.listened ? 'Listening + Extra · +1 point for each entry' : 'Only extra · +0.5 point for each entry'}</span>
                </div>
                <Sparkles size={20} />
              </div>

              {draft.extras.map((extra, index) => (
                <div className="extra-row" key={index}>
                  <input
                    value={extra}
                    placeholder={`Extra activity ${index + 1}`}
                    onChange={(event) => {
                      const next = [...draft.extras];
                      next[index] = event.target.value;
                      setDraft((previous) => ({ ...previous, extras: next }));
                    }}
                  />
                  {draft.extras.length > 1 && (
                    <button
                      className="remove-extra"
                      type="button"
                      onClick={() =>
                        setDraft((previous) => ({
                          ...previous,
                          extras: previous.extras.filter((_, itemIndex) => itemIndex !== index)
                        }))
                      }
                      aria-label="Remove extra activity"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-extra"
                onClick={() =>
                  setDraft((previous) => ({ ...previous, extras: [...previous.extras, ''] }))
                }
              >
                <Plus size={17} />
                Add another
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-footer">
              <span className="points-preview">
                {formatPoints(draft.listened ? 1 + draft.extras.filter((item) => item.trim()).length : draft.extras.filter((item) => item.trim()).length * 0.5)} possible points
              </span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <button className="delete-button" onClick={deleteDay}>
                  <X size={18} />
                  Delete data
                </button>
                <button className="save-button" onClick={saveDay}>
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
